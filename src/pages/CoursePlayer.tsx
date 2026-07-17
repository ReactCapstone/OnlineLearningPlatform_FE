import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar/sidebar";

import courseService, {
    CourseDto
} from "../services/courseService";

import sectionService, {
    SectionDto
} from "../services/sectionService";

import lessonService, {
    LessonDto
} from "../services/lessonService";

function getEmbedUrl(url: string): string {

    if (!url) return "";

    if (url.includes("/embed/"))
        return url;

    const shortUrl = url.match(/youtu\.be\/([^?&]+)/);

    if (shortUrl)
        return `https://www.youtube.com/embed/${shortUrl[1]}?autoplay=1`;

    const watchUrl = url.match(/[?&]v=([^&]+)/);

    if (watchUrl)
        return `https://www.youtube.com/embed/${watchUrl[1]}?autoplay=1`;

    return url;
}

export default function CoursePlayer() {

    const { courseId } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [course, setCourse] =
        useState<CourseDto | null>(null);

    const [sections, setSections] =
        useState<SectionDto[]>([]);

    const [lessons, setLessons] =
        useState<Record<number, LessonDto[]>>({});

    const [selectedLesson, setSelectedLesson] =
        useState<LessonDto | null>(null);

    const allLessons = useMemo(() => {

        return sections.flatMap(section =>
            lessons[section.id] ?? []
        );

    }, [sections, lessons]);

    const currentIndex = selectedLesson
        ? allLessons.findIndex(x => x.id === selectedLesson.id)
        : -1;

    const totalLessons = allLessons.length;

    useEffect(() => {

        loadCourse();

    }, [courseId]);

    async function loadCourse() {

        if (!courseId)
            return;

        try {

            setLoading(true);

            const id = Number(courseId);

            const courseData =
                await courseService.getCourse(id);

            setCourse(courseData);

            const sectionData =
                await sectionService.getSections(id);

            setSections(sectionData);

            const lessonMap: Record<number, LessonDto[]> = {};

            for (const section of sectionData) {

                const lessonData =
                    await lessonService.getLessons(section.id);

                lessonMap[section.id] = lessonData;

            }

            setLessons(lessonMap);

            if (sectionData.length > 0) {

                const firstLessons =
                    lessonMap[sectionData[0].id];

                if (firstLessons?.length > 0) {

                    setSelectedLesson(firstLessons[0]);

                }

            }

        }
        catch (err) {

            console.error(err);

            setError("Unable to load course.");

        }
        finally {

            setLoading(false);

        }

    }

    function nextLesson() {

        if (currentIndex >= allLessons.length - 1)
            return;

        setSelectedLesson(
            allLessons[currentIndex + 1]
        );

    }

    function previousLesson() {

        if (currentIndex <= 0)
            return;

        setSelectedLesson(
            allLessons[currentIndex - 1]
        );

    }

    if (loading) {

        return (

            <div className="flex justify-center items-center min-h-screen">

                Loading...

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex justify-center items-center min-h-screen">

                {error}

            </div>

        );

    }

    if (!course) {

        return (

            <div className="flex justify-center items-center min-h-screen">

                Course not found

            </div>

        );

    }    return (

        <div
            className="flex min-h-screen bg-gray-50"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >

            {/* Sidebar */}

            <Sidebar />

            {/* Main */}

            <div className="flex-1 flex flex-col overflow-auto">

                {/* Top Bar */}

                <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-4 sticky top-0 z-10">

                    <button

                        onClick={() => navigate("/courses")}

                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"

                    >

                        <svg

                            width="16"

                            height="16"

                            viewBox="0 0 24 24"

                            fill="none"

                            stroke="currentColor"

                            strokeWidth="2.5"

                        >

                            <path d="M19 12H5M12 19l-7-7 7-7" />

                        </svg>

                        Back to Courses

                    </button>

                    <div className="h-4 w-px bg-gray-200" />

                    <span className="text-sm text-gray-500">

                        {course.level}

                    </span>

                </div>

                {/* Content */}

                <div className="flex-1 px-8 py-8 max-w-[1100px] w-full mx-auto">

                    {/* Video */}

                    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video mb-6">

                        {selectedLesson ? (

                            <iframe

                                key={selectedLesson.id}

                                src={getEmbedUrl(selectedLesson.videoUrl)}

                                title={selectedLesson.title}

                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

                                allowFullScreen

                                className="w-full h-full"

                            />

                        ) : (

                            <div className="flex justify-center items-center h-full text-white">

                                No Video Available

                            </div>

                        )}

                    </div>

                    {/* Course Information */}

                    <div className="flex flex-col gap-3 mb-8">

                        <div className="flex flex-wrap gap-2">

                            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">

                                {course.level}

                            </span>

                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">

                                {course.language}

                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">

                                {totalLessons} Lessons

                            </span>

                        </div>

                        <h1 className="text-3xl font-bold text-gray-900">

                            {course.title}

                        </h1>

                        <p className="text-gray-600 leading-relaxed">

                            {course.description}

                        </p>

                    </div>
                                        {/* Playlist */}

                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                        {/* Playlist Header */}

                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">

                            <div>

                                <h2 className="text-sm font-bold text-gray-900">

                                    Course Playlist

                                </h2>

                                <p className="text-xs text-gray-400 mt-1">

                                    {totalLessons} Lessons

                                </p>

                            </div>

                            <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">

                                {selectedLesson
                                    ? `${currentIndex + 1} / ${totalLessons}`
                                    : "0 / 0"}

                            </span>

                        </div>

                        {/* Sections */}

                        <div className="max-h-[420px] overflow-y-auto">

                            {sections.map((section) => (

                                <div
                                    key={section.id}
                                    className="border-b border-gray-100"
                                >

                                    {/* Section */}

                                    <div className="bg-gray-50 px-6 py-3">

                                        <h3 className="font-semibold text-gray-800">

                                            {section.title}

                                        </h3>

                                    </div>

                                    {/* Lessons */}

                                    {lessons[section.id]?.map((lesson) => {

                                        const isActive =
                                            selectedLesson?.id === lesson.id;

                                        return (

                                            <button

                                                key={lesson.id}

                                                onClick={() =>
                                                    setSelectedLesson(lesson)
                                                }

                                                className={`

                                                w-full

                                                flex

                                                items-center

                                                gap-4

                                                px-6

                                                py-4

                                                text-left

                                                transition-all

                                                border-l-4

                                                ${isActive
                                                        ? "bg-indigo-50 border-indigo-600"
                                                        : "border-transparent hover:bg-gray-50"}

                                            `}

                                            >

                                                <div

                                                    className={`

                                                    w-8

                                                    h-8

                                                    rounded-full

                                                    flex

                                                    items-center

                                                    justify-center

                                                    shrink-0

                                                    ${isActive
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-gray-200 text-gray-700"}

                                                `}

                                                >

                                                    {isActive ? (

                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="white"
                                                        >

                                                            <polygon points="5 3 19 12 5 21" />

                                                        </svg>

                                                    ) : (

                                                        lesson.orderIndex

                                                    )}

                                                </div>

                                                <div className="flex-1">

                                                    <div

                                                        className={`font-medium ${
                                                            isActive
                                                                ? "text-indigo-700"
                                                                : "text-gray-800"
                                                        }`}

                                                    >

                                                        {lesson.title}

                                                    </div>

                                                    <div className="text-xs text-gray-400 mt-1">

                                                        {Math.floor(
                                                            lesson.durationSeconds /
                                                                60
                                                        )}{" "}
                                                        min

                                                        {lesson.isPreview && (
                                                            <>
                                                                {" • "}
                                                                Preview
                                                            </>
                                                        )}

                                                    </div>

                                                </div>

                                                {isActive && (

                                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">

                                                        Now Playing

                                                    </span>

                                                )}

                                            </button>

                                        );

                                    })}

                                </div>

                            ))}

                        </div>

                    </div>

                                        {/* Previous / Next Buttons */}

                    <div className="flex justify-between mt-6">

                        <button

                            onClick={previousLesson}

                            disabled={currentIndex <= 0}

                            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition"

                        >

                            ← Previous Lesson

                        </button>

                        <button

                            onClick={nextLesson}

                            disabled={
                                currentIndex === totalLessons - 1 ||
                                totalLessons === 0
                            }

                            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"

                        >

                            Next Lesson →

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}