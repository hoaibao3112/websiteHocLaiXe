"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
  Undo,
  Redo,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Nhập nội dung bài viết tại đây...",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-600 underline hover:text-brand-700",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose-content focus:outline-none min-h-[400px] p-6 max-w-none",
      },
    },
  });

  // Sync content from parent if changed externally (e.g., loading database content)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Nhập đường dẫn URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Nhập URL ảnh:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const buttons = [
    {
      icon: Bold,
      title: "Chữ đậm",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: Italic,
      title: "Chữ nghiêng",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: Strikethrough,
      title: "Gạch ngang",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      divider: true,
    },
    {
      icon: Heading1,
      title: "Tiêu đề 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: Heading2,
      title: "Tiêu đề 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: Heading3,
      title: "Tiêu đề 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      divider: true,
    },
    {
      icon: List,
      title: "Danh sách tròn",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      title: "Danh sách số",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: Quote,
      title: "Trích dẫn",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      divider: true,
    },
    {
      icon: Link,
      title: "Chèn link",
      action: addLink,
      isActive: editor.isActive("link"),
    },
    {
      icon: ImageIcon,
      title: "Chèn ảnh",
      action: addImage,
      isActive: false,
    },
    {
      divider: true,
    },
    {
      icon: Undo,
      title: "Hoàn tác",
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().undo(),
    },
    {
      icon: Redo,
      title: "Làm lại",
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 transition-shadow">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 bg-neutral-50 p-2.5 border-b border-neutral-200 select-none">
        {buttons.map((btn, idx) => {
          if (btn.divider) {
            return (
              <div
                key={`div-${idx}`}
                className="w-[1px] h-6 bg-neutral-200 mx-1.5 self-center"
              />
            );
          }

          const Icon = btn.icon!;
          return (
            <button
              key={idx}
              type="button"
              onClick={btn.action}
              disabled={btn.disabled}
              title={btn.title}
              className={`p-2 rounded-lg hover:bg-neutral-200 hover:text-neutral-900 transition-colors ${
                btn.isActive
                  ? "bg-neutral-200 text-neutral-950 font-bold"
                  : "text-neutral-500"
              } disabled:opacity-30 disabled:pointer-events-none`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="max-h-[600px] overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
