"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import ImageExtension from "@tiptap/extension-image";
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, ListOrdered, List, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { UploadDropzone } from "@/lib/uploadthing";

interface TiptapEditorProps {
  onChange: (value: string) => void;
  value?: string;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ onChange, value }) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const { register: registerLink, handleSubmit: handleSubmitLink, reset: resetLink } = useForm();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Superscript,
      Subscript,
      Link.configure({ openOnClick: false }),
      TextStyle,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-h-96 rounded-lg",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      console.log(value)
      editor.commands.setContent(value as string);
    }
  }, [editor, value]);

  useEffect(() => {
    const updateContent = () => {
      const html = editor?.getHTML();
      if (html) {
        onChange(html);
      }
    };
    editor?.on("update", updateContent);
    return () => {
      editor?.off("update", updateContent);
    };
  }, [editor, onChange]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleInsertImage = async (url:string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setIsImageDialogOpen(false);
    }
  };

  const handleInsertLink = ({ href, text }:{href:string,text:string}) => {
    editor.chain().focus().setLink({ href }).insertContent(text).run();
    setIsLinkDialogOpen(false);
    resetLink();
  };

  return (
    <div className="prose max-w-full relative">
      <div className="flex flex-wrap space-x-2 mb-2 bg-slate-200 dark:bg-slate-800 p-2 rounded-md w-fit">
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is-active" : ""}>
          <Bold />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "is-active" : ""}>
          <Italic />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive("strike") ? "is-active" : ""}>
          <Strikethrough />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive("code") ? "is-active" : ""}>
          <Code />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
          <Heading1 />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
          <Heading2 />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>
          <Heading3 />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
          <List />
        </Button>
        <Button variant="ghost" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
          <ListOrdered />
        </Button>
        <Button variant="ghost" onClick={() => setIsLinkDialogOpen(true)}>
          <LinkIcon />
        </Button>
        <Button variant="ghost" onClick={() => setIsImageDialogOpen(true)}>
          <ImageIcon />
        </Button>
      </div>

      <EditorContent editor={editor} className="border p-2 rounded-sm w-full min-h-[20rem]" />

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent style={{ zIndex: 60 }}>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>Upload an image for the blog post.</DialogDescription>
          </DialogHeader>
          <UploadDropzone endpoint="blogImage" onClientUploadComplete={(res) => handleInsertImage(res[0].url)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent style={{ zIndex: 60 }}>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>Enter the URL and text for the link.</DialogDescription>
          </DialogHeader>
          {/* @ts-ignore */}
          <form onSubmit={handleSubmitLink(handleInsertLink)}>
            <Input {...registerLink("href", { required: true })} placeholder="URL" className="mb-2" />
            <Input {...registerLink("text")} placeholder="Link Text" className="mb-4" />
            <DialogFooter>
              <Button type="submit">Insert Link</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TiptapEditor;
