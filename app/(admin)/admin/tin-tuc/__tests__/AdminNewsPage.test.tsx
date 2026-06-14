import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminNewsPage from "../page";

// Giả lập dữ liệu
const mockCategories = [
  { id: "cat-1", name: "Chuyên mục 1", slug: "chuyen-muc-1", display_order: 1 },
  { id: "cat-2", name: "Chuyên mục 2", slug: "chuyen-muc-2", display_order: 2 },
];

const mockNews = [
  {
    id: "news-1",
    title: "Bài viết số một về B2",
    slug: "bai-viet-so-mot-ve-b2",
    cover_image: "/img1.jpg",
    is_published: true,
    created_at: "2026-06-14T00:00:00Z",
    published_at: "2026-06-14T00:00:00Z",
    category_id: "cat-1",
    view_count: 10,
    news_categories: { id: "cat-1", name: "Chuyên mục 1", slug: "chuyen-muc-1" },
  },
  {
    id: "news-2",
    title: "Kinh nghiệm thi sát hạch lái xe C",
    slug: "kinh-nghiem-thi-sat-hach-lai-xe-c",
    cover_image: null,
    is_published: false,
    created_at: "2026-06-13T00:00:00Z",
    published_at: null,
    category_id: "cat-2",
    view_count: 5,
    news_categories: { id: "cat-2", name: "Chuyên mục 2", slug: "chuyen-muc-2" },
  },
];

// Mock Supabase client
const mockFrom = vi.fn();
const mockNewsDeleteEq = vi.fn().mockResolvedValue({ error: null });
const mockNewsDelete = vi.fn().mockReturnValue({ eq: mockNewsDeleteEq });

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

// Mock components phụ để tránh lỗi liên quan đến Next/Image hoặc các component con không cần thiết test sâu
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || ""} />,
}));

vi.mock("@/components/admin/PublishToggle", () => ({
  PublishToggle: ({ id, isPublished }: any) => (
    <span data-testid={`publish-toggle-${id}`}>{isPublished ? "Công khai" : "Bản nháp"}</span>
  ),
}));

describe("AdminNewsPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock query trả về categories và news tương ứng
    mockFrom.mockImplementation((table) => {
      if (table === "news_categories") {
        return {
          select: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockCategories, error: null }),
          }),
        };
      }
      if (table === "news") {
        return {
          select: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({ data: mockNews, error: null }),
          }),
          delete: mockNewsDelete,
        };
      }
      return {};
    });
  });

  // ── [1] HAPPY PATH ──────────────────────────────────────────────────────────
  it("[HAPPY PATH] nên tải dữ liệu và hiển thị danh sách tin tức lên bảng", async () => {
    render(<AdminNewsPage />);

    // Chờ cho danh sách bài viết hiển thị trên màn hình
    await waitFor(() => {
      expect(screen.getByText("Bài viết số một về B2")).toBeInTheDocument();
      expect(screen.getByText("Kinh nghiệm thi sát hạch lái xe C")).toBeInTheDocument();
    });
  });

  it("[HAPPY PATH] nên lọc danh sách bài viết theo từ khóa tìm kiếm (search)", async () => {
    render(<AdminNewsPage />);

    await waitFor(() => {
      expect(screen.getByText("Bài viết số một về B2")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Tìm kiếm theo tiêu đề bài viết...");
    fireEvent.change(searchInput, { target: { value: "Kinh nghiệm" } });

    // "Kinh nghiệm thi sát hạch lái xe C" sẽ ở lại, "Bài viết số một về B2" biến mất
    expect(screen.getByText("Kinh nghiệm thi sát hạch lái xe C")).toBeInTheDocument();
    expect(screen.queryByText("Bài viết số một về B2")).not.toBeInTheDocument();
  });

  it("[HAPPY PATH] nên lọc danh sách bài viết theo chuyên mục (category filter)", async () => {
    render(<AdminNewsPage />);

    await waitFor(() => {
      expect(screen.getByText("Bài viết số một về B2")).toBeInTheDocument();
    });

    const selectDropdown = screen.getByRole("combobox");
    // Lọc theo Chuyên mục 1 (cat-1)
    fireEvent.change(selectDropdown, { target: { value: "cat-1" } });

    expect(screen.getByText("Bài viết số một về B2")).toBeInTheDocument();
    expect(screen.queryByText("Kinh nghiệm thi sát hạch lái xe C")).not.toBeInTheDocument();
  });

  it("[HAPPY PATH] nên gọi Supabase xóa bài viết khi click nút Xóa và xác nhận", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<AdminNewsPage />);

    await waitFor(() => {
      expect(screen.getByText("Bài viết số một về B2")).toBeInTheDocument();
    });

    // Tìm nút Xóa của bài viết thứ nhất (news-1)
    const deleteButtons = screen.getAllByTitle("Xóa bài viết");
    fireEvent.click(deleteButtons[0]);

    expect(confirmSpy).toHaveBeenCalledWith('Bạn có chắc chắn muốn xóa bài viết "Bài viết số một về B2"?');

    await waitFor(() => {
      // Đảm bảo supabase delete đã được gọi đúng id
      expect(mockFrom).toHaveBeenCalledWith("news");
      expect(mockNewsDelete).toHaveBeenCalled();
      expect(mockNewsDeleteEq).toHaveBeenCalledWith("id", "news-1");
      
      // Đảm bảo dòng tin tức "Bài viết số một về B2" bị xóa khỏi UI
      expect(screen.queryByText("Bài viết số một về B2")).not.toBeInTheDocument();
    });

    confirmSpy.mockRestore();
  });
});
