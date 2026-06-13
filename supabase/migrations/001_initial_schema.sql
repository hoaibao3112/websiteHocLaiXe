-- ============================================================
-- ENUMS
-- ============================================================
create type public.user_role as enum ('admin', 'editor', 'staff', 'student');

-- ============================================================
-- USER PROFILES (extends auth.users)
-- ============================================================
create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'student',
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'User'),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper: get current user role
create or replace function public.get_user_role()
returns public.user_role as $$
  select role from public.user_profiles where id = auth.uid();
$$ language sql security definer stable;

-- ============================================================
-- STUDENTS (Học viên)
-- ============================================================
create table public.students (
  id uuid primary key references auth.users(id) on delete cascade,
  student_code varchar(20) unique not null,
  full_name text not null,
  phone varchar(15),
  dob date,
  id_card varchar(20),
  course_class varchar(10) not null default 'B2',  -- B1, B2, C, ...
  enrollment_date date not null default current_date,
  status varchar(20) not null default 'active',     -- active, graduated, suspended
  notes text,
  created_at timestamptz not null default now()
);

create table public.exam_schedules (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  exam_type varchar(50) not null,     -- 'ly_thuyet', 'thuc_hanh_sa_hinh', 'thuc_hanh_duong'
  scheduled_at timestamptz not null,
  location text,
  result varchar(20),                 -- 'passed', 'failed', 'pending'
  score numeric(5,2),
  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- COURSES (Khóa học)
-- ============================================================
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class_code varchar(10) not null,          -- B01, B2, C1...
  description text,
  features text[],                          -- ['6 tháng học', 'Hỗ trợ thi lại']
  original_price numeric(12,0),
  sale_price numeric(12,0) not null,
  image_url text,
  badge text,                               -- 'Phổ biến nhất', 'Hot'
  is_active boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- NEWS (Tin tức — module CMS chính)
-- ============================================================
create table public.news_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug varchar(100) unique not null,
  display_order int default 0
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug varchar(255) unique not null,
  excerpt text,
  content text not null,                    -- HTML output từ Tiptap
  cover_image text,
  category_id uuid references public.news_categories(id) on delete set null,
  author_id uuid references auth.users(id) on delete set null,
  is_published boolean default false,
  published_at timestamptz,
  view_count int default 0,
  meta_title text,                          -- SEO
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger news_updated_at
  before update on public.news
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- CONTACTS (Leads từ form liên hệ)
-- ============================================================
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone varchar(15) not null,
  email text,
  subject text,
  message text,
  status varchar(20) default 'new',     -- 'new', 'contacted', 'closed'
  created_at timestamptz default now()
);

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- user_profiles
alter table public.user_profiles enable row level security;
create policy "users read own profile" on public.user_profiles
  for select using (auth.uid() = id);
create policy "admin read all profiles" on public.user_profiles
  for all using (public.get_user_role() = 'admin');

-- students
alter table public.students enable row level security;
create policy "student read own" on public.students
  for select using (auth.uid() = id);
create policy "admin staff manage students" on public.students
  for all using (public.get_user_role() in ('admin', 'staff'));

-- exam_schedules
alter table public.exam_schedules enable row level security;
create policy "student read own exams" on public.exam_schedules
  for select using (
    exists (
      select 1 from public.students s
      where s.id = exam_schedules.student_id and s.id = auth.uid()
    )
  );
create policy "admin staff manage exams" on public.exam_schedules
  for all using (public.get_user_role() in ('admin', 'staff'));

-- courses: public đọc, admin ghi
alter table public.courses enable row level security;
create policy "public read active courses" on public.courses
  for select using (is_active = true);
create policy "admin manage courses" on public.courses
  for all using (public.get_user_role() = 'admin');

-- news_categories: public đọc, admin/editor ghi
alter table public.news_categories enable row level security;
create policy "public read categories" on public.news_categories
  for select using (true);
create policy "admin editor manage categories" on public.news_categories
  for all using (public.get_user_role() in ('admin', 'editor'));

-- news: public đọc bài published, admin/editor full quyền
alter table public.news enable row level security;
create policy "public read published news" on public.news
  for select using (is_published = true);
create policy "admin editor manage news" on public.news
  for all using (public.get_user_role() in ('admin', 'editor'));

-- contacts: public insert, admin/staff đọc
alter table public.contacts enable row level security;
create policy "public submit contact" on public.contacts
  for insert with check (true);
create policy "admin staff read contacts" on public.contacts
  for select using (public.get_user_role() in ('admin', 'staff'));

-- ============================================================
-- SEED DATA
-- ============================================================
insert into public.news_categories (name, slug, display_order) values
  ('Tin tức tổng hợp', 'tin-tuc-tong-hop', 1),
  ('Luật giao thông', 'luat-giao-thong', 2),
  ('Kinh nghiệm lái xe', 'kinh-nghiem-lai-xe', 3),
  ('Thông báo trường', 'thong-bao-truong', 4);

insert into public.courses (name, class_code, sale_price, original_price, badge, features, display_order, is_active) values
  ('Khóa học Hạng B.01 (Số sàn)', 'B01', 18500000, 20000000, null,
   ARRAY['Thời gian đào tạo 6 tháng', 'Thi lý thuyết + sa hình + đường trường', 'Hỗ trợ thi lại miễn phí 1 lần', 'Xe mới 100%'],
   1, true),
  ('Khóa học Hạng B (Số tự động)', 'B', 20500000, 22500000, 'Phổ biến nhất',
   ARRAY['Thời gian đào tạo 6 tháng', 'Phù hợp xe số tự động', 'Hỗ trợ thi lại miễn phí 2 lần', 'Giáo viên kinh nghiệm 10+ năm'],
   2, true),
  ('Khóa học Hạng C1', 'C1', 25000000, 28000000, null,
   ARRAY['Thời gian đào tạo 9 tháng', 'Dành cho xe tải nhỏ', 'Hỗ trợ làm hồ sơ toàn bộ', 'Bằng lái cả B2 + C1'],
   3, true);
