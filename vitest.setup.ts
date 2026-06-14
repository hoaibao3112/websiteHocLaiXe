import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
    };
  },
  usePathname() {
    return "";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock window.confirm (thường dùng khi xóa bài viết)
if (typeof window !== "undefined") {
  window.confirm = vi.fn(() => true);
  window.alert = vi.fn();
} else {
  global.confirm = vi.fn(() => true);
  global.alert = vi.fn();
}
