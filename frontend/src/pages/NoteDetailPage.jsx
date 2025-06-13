import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        try {
            setSaving(true);
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully", {
                position: "bottom-right",
            });
            navigate("/");
        } catch (error) {
            console.error("Failed to delete note:", error);
            toast.error("Failed to delete note", {
                position: "bottom-right",
            });
        } finally {
            setSaving(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Title and content cannot be empty.", {
                position: "bottom-right"
            });
            return;
        }
        setSaving(true);
        try {
            await api.put(`/notes/${id}`, {
                title: note.title,
                content: note.content
            });
            toast.success("Note updated successfully!", {
                position: "bottom-right"
            });
            navigate("/");
        } catch (error) {
            console.error("Failed to update note:", error);
            if (error.response?.status === 429) {
                toast.error("Slow Down! Rate limit exceeded", {
                    position: "bottom-right",
                    icon: "💀"
                });
            } else {
                toast.error("Failed to update note", {
                    position: "bottom-right"
                });
            }
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get(`/notes/${id}`);
                setNote(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch note:", error);
                toast.error("Failed to fetch note", {
                    position: "bottom-right",
                });
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container max-w-2xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <Link to="/" className="btn btn-ghost">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to Notes
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error btn-outline">
                        <Trash2Icon className="h-5 w-5" />
                        Delete Note
                    </button>
                </div>
                <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Note Title"
                                        className="input input-bordered"
                                        value={note.title}
                                        onChange={(e) => setNote({...note, title: e.target.value})}
                                    />
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Content</span>
                                        </label>
                                        <textarea
                                            placeholder="Write your note here..."
                                            className="textarea textarea-bordered h-32"
                                            value={note.content}
                                            onChange={(e) => setNote({ ...note, content: e.target.value})}
                                        />
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {saving ? "Sinving..." : "Update Note"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>)
};
export default NoteDetailPage;