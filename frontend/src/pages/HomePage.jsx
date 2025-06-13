import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import { api } from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { LoaderIcon } from "lucide-react";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [Notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try {
                const response = await api.get("/notes");
                setNotes(response.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                    toast.error("Failed to fetch notes", {
                        position: "bottom-right"
                    });
                } else {
                    toast.error("Failed to fetch notes", {
                        position: "bottom-right"
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            {isRateLimited && (<RateLimitedUI />)}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {Notes.length === 0 && !isRateLimited && (
                    <NotesNotFound />
                )}

                {Notes.length > 0 && !isRateLimited && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-primary font-mono">
                            Your Notes
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Notes.map(note => (
                                <NoteCard key={note._id} note={note} setNotes={setNotes} />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default HomePage;