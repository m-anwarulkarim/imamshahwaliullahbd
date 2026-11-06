import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentManager } from "@/components/admin/ContentManager";
import { adminHead, useAdminText } from "@/lib/admin-ui";
import { CourseAccessRequests } from "@/components/admin/CourseAccessRequests";
import {
  adminListCourses,
  adminSaveCourse,
  adminDeleteCourse,
  adminListLessons,
  adminSaveLesson,
  adminDeleteLesson,
  courseSchema,
  lessonSchema,
} from "@/lib/courses";

export const Route = createFileRoute("/_admin/admin/short-courses")({
  head: () => adminHead("Short Courses"),
  component: AdminShortCourses,
});

function AdminShortCourses() {
  const a = useAdminText();
  const list = useServerFn(adminListCourses);
  const save = useServerFn(adminSaveCourse);
  const remove = useServerFn(adminDeleteCourse);
  const courses = useQuery({ queryKey: ["admin", "short-courses"], queryFn: () => list() });
  const [selected, setSelected] = useState("");

  return (
    <div className="space-y-12">
      <CourseAccessRequests />
      <ContentManager
        title="Short Courses"
        description=""
        rows={courses.data as any}
        isLoading={courses.isLoading}
        error={courses.error}
        onChanged={courses.refetch}
        columns={[
          { key: "titleEn", label: "Title" },
          { key: "fee", label: "Admission fee" },
          { key: "monthlyFee", label: "Monthly fee" },
          { key: "isPublished", label: "Published" },
        ]}
        fields={[
          { name: "slug", label: "Slug", type: "text", required: true },
          { name: "titleEn", label: "Title (en)", type: "text", required: true },
          { name: "titleBn", label: "Title (bn)", type: "text", required: true },
          { name: "titleAr", label: "Title (ar)", type: "text", required: true },
          { name: "subtitleEn", label: "Description (en)", type: "textarea" },
          { name: "subtitleBn", label: "Description (bn)", type: "textarea" },
          { name: "subtitleAr", label: "Description (ar)", type: "textarea" },
          { name: "imageUrl", label: "Image", type: "image" },
          { name: "fee", label: "Admission fee", type: "number" },
          { name: "monthlyFee", label: "Monthly fee", type: "number" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "isPublished", label: "Published", type: "switch" },
        ]}
        onCreate={(v) => save({ data: courseSchema.parse(v) })}
        onUpdate={(id, v) => save({ data: { id, ...courseSchema.parse(v) } })}
        onDelete={(id) => remove({ data: { id } })}
      />
      <section className="space-y-4">
        <Label>{a("Classes & Sheets")}</Label>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder={a("Course")} />
          </SelectTrigger>
          <SelectContent>
            {courses.data?.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.titleEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected && <LessonsEditor key={selected} courseId={selected} />}
      </section>
    </div>
  );
}

function LessonsEditor({ courseId }: { courseId: string }) {
  const list = useServerFn(adminListLessons);
  const save = useServerFn(adminSaveLesson);
  const remove = useServerFn(adminDeleteLesson);
  const lessons = useQuery({
    queryKey: ["admin", "lessons", courseId],
    queryFn: () => list({ data: { courseId } }),
  });

  return (
    <ContentManager
      title="Classes & Sheets"
      description=""
      rows={lessons.data as any}
      isLoading={lessons.isLoading}
      error={lessons.error}
      onChanged={lessons.refetch}
      columns={[
        { key: "sortOrder", label: "Sort order" },
        { key: "title", label: "Title" },
        { key: "kind", label: "Type" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "kind", label: "Type", type: "select", options: ["video", "live", "document"], required: true },
        { name: "url", label: "URL", type: "text", required: true },
        { name: "scheduledAt", label: "Scheduled at", type: "datetime" },
        { name: "sortOrder", label: "Sort order", type: "number" },
      ]}
      onCreate={(v) =>
        save({
          data: lessonSchema.parse({
            ...v,
            courseId,
            scheduledAt: v["scheduledAt"] ? new Date(String(v["scheduledAt"])).toISOString() : undefined,
          }),
        })
      }
      onUpdate={(id, v) =>
        save({
          data: {
            id,
            ...lessonSchema.parse({
              ...v,
              courseId,
              scheduledAt: v["scheduledAt"] ? new Date(String(v["scheduledAt"])).toISOString() : undefined,
            }),
          },
        })
      }
      onDelete={(id) => remove({ data: { id } })}
    />
  );
}
