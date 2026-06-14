import { describe, it, expect } from "vitest";
import { createNewsSchema, updateNewsSchema } from "../news.schema";

describe("News Schema Validation", () => {
  const validPayload = {
    title: "Hướng dẫn học lái xe B2 cho người mới",
    slug: "huong-dan-hoc-lai-xe-b2",
    excerpt: "Đoạn tóm tắt ngắn về việc học lái xe B2 cho người mới.",
    content: "Nội dung bài viết đầy đủ chi tiết hơn 10 ký tự ở đây.",
    cover_image: "https://example.com/cover.jpg",
    category_id: "c82efca0-3023-42e5-ad89-be445c71178a",
    is_published: true,
    meta_title: "Học lái xe B2",
    meta_description: "Hướng dẫn học lái xe B2 cho người mới từ A đến Z",
  };

  describe("createNewsSchema", () => {
    // ── [1] HAPPY PATH ──────────────────────────────────────────────────────────
    it("[HAPPY PATH] nên validate thành công với payload hợp lệ đầy đủ", () => {
      const result = createNewsSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("[HAPPY PATH] nên validate thành công khi thiếu các trường optional (null hoặc undefined)", () => {
      const minimalPayload = {
        title: "Hướng dẫn học lái xe B2",
        slug: "huong-dan-hoc-lai-xe-b2",
        content: "Nội dung bài viết dài hơn 10 ký tự.",
      };
      const result = createNewsSchema.safeParse(minimalPayload);
      expect(result.success).toBe(true);
    });

    // ── [2] EDGE CASES & VALIDATION ─────────────────────────────────────────────
    it("[EDGE CASE] nên validate thất bại khi tiêu đề quá ngắn (< 5 ký tự)", () => {
      const payload = { ...validPayload, title: "Học" };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Tiêu đề phải có ít nhất 5 ký tự");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi tiêu đề quá dài (> 255 ký tự)", () => {
      const payload = { ...validPayload, title: "a".repeat(256) };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Tiêu đề không quá 255 ký tự");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi slug ngắn hơn 3 ký tự", () => {
      const payload = { ...validPayload, slug: "ab" };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Slug phải có ít nhất 3 ký tự");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi slug chứa ký tự viết hoa hoặc ký tự đặc biệt", () => {
      const invalidSlugs = ["huong-dan-Hoc-lai-xe", "huong_dan_hoc", "huong-dan-hoc!"];
      invalidSlugs.forEach((slug) => {
        const payload = { ...validPayload, slug };
        const result = createNewsSchema.safeParse(payload);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Slug chỉ chứa chữ thường, số và dấu gạch ngang"
          );
        }
      });
    });

    it("[EDGE CASE] nên validate thất bại khi excerpt quá dài (> 500 ký tự)", () => {
      const payload = { ...validPayload, excerpt: "a".repeat(501) };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Tóm tắt không quá 500 ký tự");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi content quá ngắn (< 10 ký tự)", () => {
      const payload = { ...validPayload, content: "Ngắn" };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Nội dung bài viết quá ngắn");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi cover_image không phải là một URL hợp lệ", () => {
      const payload = { ...validPayload, cover_image: "not-a-url" };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("URL ảnh không hợp lệ");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi category_id không phải định dạng UUID", () => {
      const payload = { ...validPayload, category_id: "not-a-uuid" };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    it("[EDGE CASE] nên validate thất bại khi meta_title quá dài (> 60 ký tự)", () => {
      const payload = { ...validPayload, meta_title: "a".repeat(61) };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Meta title không quá 60 ký tự");
      }
    });

    it("[EDGE CASE] nên validate thất bại khi meta_description quá dài (> 160 ký tự)", () => {
      const payload = { ...validPayload, meta_description: "a".repeat(161) };
      const result = createNewsSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Meta description không quá 160 ký tự");
      }
    });
  });

  describe("updateNewsSchema", () => {
    it("[HAPPY PATH] nên validate thành công với payload trống hoặc partial", () => {
      const resultEmpty = updateNewsSchema.safeParse({});
      const resultPartial = updateNewsSchema.safeParse({ title: "Tiêu đề mới" });
      expect(resultEmpty.success).toBe(true);
      expect(resultPartial.success).toBe(true);
    });

    it("[EDGE CASE] nên validate thất bại khi các trường partial vi phạm ràng buộc", () => {
      const result = updateNewsSchema.safeParse({ title: "Ngắn" });
      expect(result.success).toBe(false);
    });
  });
});
