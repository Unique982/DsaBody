"use client";

import type React from "react";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddCourseDialogProps {
  onAddCourse?: (courseData: {
    title: string;
    category: string;
    instructor: string;
    duration: string;
    level: string;
    youtubeUrl: string;
    chapters: string[];
  }) => void;
}

export function AddCourseDialog({ onAddCourse }: AddCourseDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    instructor: "",
    duration: "",
    level: "Beginner",
    youtubeUrl: "",
    chapters: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "chapter" && index !== undefined) {
      const newChapters = [...formData.chapters];
      newChapters[index] = value;
      setFormData((prev) => ({ ...prev, chapters: newChapters }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLevelChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      level: value,
    }));
  };

  const addChapter = () => {
    setFormData((prev) => ({ ...prev, chapters: [...prev.chapters, ""] }));
  };

  const removeChapter = (index: number) => {
    const newChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, chapters: newChapters }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.instructor.trim() ||
      !formData.duration.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("[v0] Adding course:", formData);

    if (onAddCourse) {
      onAddCourse(formData);
    }

    // Reset form
    setFormData({
      title: "",
      category: "",
      instructor: "",
      duration: "",
      level: "Beginner",
      youtubeUrl: "",
      chapters: [""],
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new course
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Course Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter course title"
              value={formData.title}
              onChange={handleInputChange}
              className="h-10 border-border"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-medium text-foreground"
            >
              Category
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              placeholder="Enter course category"
              value={formData.category}
              onChange={handleInputChange}
              className="h-10 border-border"
              required
            />
          </div>

          {/* Instructor */}
          <div className="space-y-2">
            <Label
              htmlFor="instructor"
              className="text-sm font-medium text-foreground"
            >
              Instructor
            </Label>
            <Input
              id="instructor"
              name="instructor"
              type="text"
              placeholder="Enter instructor name"
              value={formData.instructor}
              onChange={handleInputChange}
              className="h-10 border-border"
              required
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label
              htmlFor="duration"
              className="text-sm font-medium text-foreground"
            >
              Duration
            </Label>
            <Input
              id="duration"
              name="duration"
              type="text"
              placeholder="Enter course duration (e.g., 30 Days)"
              value={formData.duration}
              onChange={handleInputChange}
              className="h-10 border-border"
              required
            />
          </div>

          {/* Level */}
          <div className="space-y-2">
            <Label
              htmlFor="level"
              className="text-sm font-medium text-foreground"
            >
              Level
            </Label>
            <Select value={formData.level} onValueChange={handleLevelChange}>
              <SelectTrigger id="level" className="h-10 border-border w-full">
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* YouTube URL */}
          <div className="space-y-2">
            <Label
              htmlFor="youtubeUrl"
              className="text-sm font-medium text-foreground"
            >
              YouTube URL
            </Label>
            <Input
              id="youtubeUrl"
              name="youtubeUrl"
              type="text"
              placeholder="Enter YouTube URL"
              value={formData.youtubeUrl}
              onChange={handleInputChange}
              className="h-10 border-border"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
