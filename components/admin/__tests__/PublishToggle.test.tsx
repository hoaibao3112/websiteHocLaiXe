import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PublishToggle } from "../PublishToggle";

// Mock Supabase client
const mockEq = vi.fn();
const mockUpdate = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

describe("PublishToggle Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Set up default fluent API mock for Supabase
    mockFrom.mockReturnValue({
      update: mockUpdate,
    });
    mockUpdate.mockReturnValue({
      eq: mockEq,
    });
    mockEq.mockResolvedValue({ error: null });
  });

  // ── [1] HAPPY PATH ──────────────────────────────────────────────────────────
  it("[HAPPY PATH] nên render đúng trạng thái 'Bản nháp' khi isPublished = false", () => {
    render(<PublishToggle id="test-news-id" isPublished={false} />);
    expect(screen.getByText("Bản nháp")).toBeInTheDocument();
  });

  it("[HAPPY PATH] nên render đúng trạng thái 'Công khai' khi isPublished = true", () => {
    render(<PublishToggle id="test-news-id" isPublished={true} />);
    expect(screen.getByText("Công khai")).toBeInTheDocument();
  });

  it("[HAPPY PATH] nên chuyển sang 'Công khai' và gọi Supabase update khi bấm vào 'Bản nháp'", async () => {
    const onSuccessMock = vi.fn();
    render(
      <PublishToggle id="test-news-id" isPublished={false} onSuccess={onSuccessMock} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Kiểm tra xem đã hiển thị trạng thái "Đang lưu"
    expect(screen.getByText("Đang lưu")).toBeInTheDocument();

    await waitFor(() => {
      // Đảm bảo Supabase client được gọi đúng bảng và data
      expect(mockFrom).toHaveBeenCalledWith("news");
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          is_published: true,
          published_at: expect.any(String),
        })
      );
      expect(mockEq).toHaveBeenCalledWith("id", "test-news-id");
      
      // Đảm bảo UI chuyển sang "Công khai" và gọi callback onSuccess
      expect(screen.getByText("Công khai")).toBeInTheDocument();
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it("[HAPPY PATH] nên chuyển sang 'Bản nháp' và gọi Supabase update khi bấm vào 'Công khai'", async () => {
    render(<PublishToggle id="test-news-id" isPublished={true} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFrom).toHaveBeenCalledWith("news");
      expect(mockUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          is_published: false,
          published_at: null,
        })
      );
      expect(mockEq).toHaveBeenCalledWith("id", "test-news-id");
      expect(screen.getByText("Bản nháp")).toBeInTheDocument();
    });
  });

  // ── [2] ERROR HANDLING ──────────────────────────────────────────────────────
  it("[ERROR] nên khôi phục trạng thái cũ và alert khi Supabase update lỗi", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    // Giả lập lỗi từ Supabase
    mockEq.mockResolvedValue({ error: new Error("Supabase Database Error") });

    render(<PublishToggle id="test-news-id" isPublished={false} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Không thể cập nhật trạng thái hiển thị.");
      // Trạng thái vẫn là "Bản nháp" sau khi lỗi xảy ra
      expect(screen.getByText("Bản nháp")).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
