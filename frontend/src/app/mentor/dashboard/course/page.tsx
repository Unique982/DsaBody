"use client";

import { useState } from "react";
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AddUserDialog } from "../mentor/mentor.model";
import { AddCourseDialog } from "./course.model";

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  status: "active" | "inactive";
}

const initialMockCourses: Course[] = [
  {
    id: 1,
    title: "DSA Basics",
    category: "Programming",
    instructor: "John Doe",
    duration: "30 Days",
    level: "Beginner",
    status: "active",
  },
  {
    id: 2,
    title: "Advanced Java",
    category: "Programming",
    instructor: "Sarah Smith",
    duration: "45 Days",
    level: "Advanced",
    status: "active",
  },
  {
    id: 3,
    title: "React for Beginners",
    category: "Frontend",
    instructor: "Mike Johnson",
    duration: "20 Days",
    level: "Beginner",
    status: "inactive",
  },
  {
    id: 4,
    title: "Next.js Fullstack",
    category: "Frontend",
    instructor: "Emily Brown",
    duration: "25 Days",
    level: "Intermediate",
    status: "active",
  },
  {
    id: 5,
    title: "Node.js API",
    category: "Backend",
    instructor: "David Lee",
    duration: "30 Days",
    level: "Intermediate",
    status: "active",
  },
  {
    id: 6,
    title: "Python ML",
    category: "AI",
    instructor: "Lisa Chen",
    duration: "50 Days",
    level: "Advanced",
    status: "active",
  },
];

const ITEMS_PER_PAGE = 5;

export default function CourseList() {
  const [courses, setCourses] = useState(initialMockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter courses based on search
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Courses
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and view all courses in your system
          </p>
        </div>
        <AddCourseDialog />
      </div>

      {/* Search Section */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, category or instructor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Courses Table - Desktop View */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/50">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Instructor</TableHead>
              <TableHead className="font-semibold">Duration</TableHead>
              <TableHead className="font-semibold">Level</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCourses.map((course) => (
              <TableRow
                key={course.id}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <span className="font-medium text-foreground">
                    {course.title}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {course.category}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {course.instructor}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {course.duration}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {course.level}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      course.status === "active" ? "default" : "secondary"
                    }
                    className={
                      course.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {course.status.charAt(0).toUpperCase() +
                      course.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Courses List - Mobile View */}
      <div className="md:hidden space-y-3">
        {paginatedCourses.map((course) => (
          <Card key={course.id} className="border border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-foreground">
                    {course.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Category: {course.category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Duration: {course.duration}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Level: {course.level}
                  </p>
                  <Badge
                    variant={
                      course.status === "active" ? "default" : "secondary"
                    }
                    className={
                      course.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200 text-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 text-xs"
                    }
                  >
                    {course.status.charAt(0).toUpperCase() +
                      course.status.slice(1)}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredCourses.length)} of{" "}
          {filteredCourses.length} courses
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 3 && (
              <PaginationItem>
                <span className="px-1.5">...</span>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
