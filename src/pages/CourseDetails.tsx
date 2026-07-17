import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import courseService, { CourseDto } from "../services/courseService";
import sectionService, { SectionDto } from "../services/sectionService";
import lessonService, { LessonDto } from "../services/lessonService";

export default function CourseDetails() {

    const { id } = useParams();

    const courseId = Number(id);

    const [course, setCourse] = useState<CourseDto | null>(null);

    const [sections, setSections] = useState<SectionDto[]>([]);

    const [lessons, setLessons] = useState<Record<number, LessonDto[]>>({});

    const [expandedSection, setExpandedSection] = useState<number | null>(null);

    const [selectedLesson, setSelectedLesson] = useState<LessonDto | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadPage();

    }, [courseId]);

    const loadPage = async () => {

        try {

            setLoading(true);

            // const courses = await courseService.getCourses();

            // const currentCourse = courses.find(x => x.id === courseId);

            // const currentCourse = await courseService.getCourse(courseId);

            // setCourse(currentCourse);

            // if (currentCourse) {

            //     setCourse(currentCourse);

            // }

            const currentCourse = await courseService.getCourse(courseId);
            console.log(sections);
            setCourse(currentCourse);

            const sectionList = await sectionService.getSections(courseId);
            console.log(sections);
            setSections(sectionList);

        }
        catch (err) {

            console.log(err);

        }
        finally {

            setLoading(false);

        }

    };

    const loadLessons = async (sectionId: number) => {

        if (lessons[sectionId]) {

            setExpandedSection(sectionId);

            return;

        }

        try {

            const data = await lessonService.getLessons(sectionId);

            setLessons(prev => ({

                ...prev,

                [sectionId]: data

            }));

            setExpandedSection(sectionId);

        }
        catch (err) {

            console.log(err);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                <h2 className="text-xl font-semibold">

                    Loading Course...

                </h2>

            </div>

        );

    }

    if (!course) {

        return (

            <div className="text-center mt-20">

                <h2 className="text-2xl font-bold">

                    Course Not Found

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Header */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

                <h1 className="text-3xl font-bold">

                    {course.title}

                </h1>

                <p className="text-slate-600 mt-4">

                    {course.description}

                </p>

                <div className="flex gap-6 mt-6">

                    <span>

                        Level :

                        <b> {course.level}</b>

                    </span>

                    <span>

                        Language :

                        <b> {course.language}</b>

                    </span>

                    <span>

                        Price :

                        <b> ₹{course.price}</b>

                    </span>

                </div>

            </div>

            {/* Left + Right Layout */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Sections */}

                <div className="lg:col-span-1">

                    <div className="bg-white rounded-xl shadow">

                        <div className="p-5 border-b">

                            <h2 className="text-xl font-bold">

                                Course Content

                            </h2>

                        </div>

                        {

                            sections.length === 0 ?

                                (

                                    <div className="p-5">

                                        No Sections Found

                                    </div>

                                )

                                :

                                sections.map(section => (

                                    <div

                                        key={section.id}

                                        className="border-b"

                                    >

                                        <button

                                            className="w-full text-left px-5 py-4 hover:bg-slate-50 flex justify-between"

                                            onClick={() => loadLessons(section.id)}

                                        >

                                            <span className="font-semibold">

                                                {section.title}

                                            </span>

                                            <span>

                                                {

                                                    expandedSection === section.id

                                                        ? "-"

                                                        : "+"

                                                }

                                            </span>

                                        </button>

                                        {

                                            expandedSection === section.id &&

                                            (

                                                <div className="bg-slate-50">

                                                    {

                                                        lessons[section.id]?.length > 0 ?

                                                            (

                                                                lessons[section.id].map(lesson => (

                                                                    <div

                                                                        key={lesson.id}

                                                                        className={`

                                                                            px-6

                                                                            py-3

                                                                            cursor-pointer

                                                                            hover:bg-blue-100

                                                                            border-t

                                                                            ${selectedLesson?.id === lesson.id

                                                                                ? "bg-blue-100"

                                                                                : ""

                                                                            }

                                                                        `}

                                                                        onClick={() => setSelectedLesson(lesson)}

                                                                    >

                                                                        <div className="font-medium">

                                                                            ▶ {lesson.title}

                                                                        </div>

                                                                        <div className="text-xs text-slate-500">

                                                                            {Math.floor(lesson.durationSeconds / 60)} mins

                                                                        </div>

                                                                    </div>

                                                                ))

                                                            )

                                                            :

                                                            (

                                                                <div className="p-5">

                                                                    Loading...

                                                                </div>

                                                            )

                                                    }

                                                </div>

                                            )

                                        }

                                    </div>

                                ))

                        }

                    </div>

                </div>

                {/* Right */}

                <div className="lg:col-span-2">

                    {

                        selectedLesson ?

                            (

                                <div className="bg-white rounded-xl shadow p-6">

                                    <h2 className="text-2xl font-bold mb-5">

                                        {selectedLesson.title}

                                    </h2>

                                    <div className="aspect-video rounded-lg overflow-hidden">

                                        <iframe

                                            className="w-full h-full"

                                            src={selectedLesson.videoUrl.replace("watch?v=", "embed/")}

                                            allowFullScreen

                                        ></iframe>

                                    </div>

                                    <div className="mt-5">

                                        <p>

                                            Duration :

                                            <strong>

                                                {" "}
                                                {Math.floor(selectedLesson.durationSeconds / 60)}

                                                {" "}Minutes

                                            </strong>

                                        </p>

                                        <p className="mt-2">

                                            Preview :

                                            {

                                                selectedLesson.isPreview

                                                    ? " Yes"

                                                    : " No"

                                            }

                                        </p>

                                    </div>

                                </div>

                            )

                            :

                            (

                                <div className="bg-white rounded-xl shadow p-10 text-center">

                                    <h2 className="text-2xl font-bold">

                                        Select a Lesson

                                    </h2>

                                    <p className="mt-4 text-slate-500">

                                        Click any lesson from the left panel.

                                    </p>

                                </div>

                            )

                    }

                </div>

            </div>

        </div>

    );

}