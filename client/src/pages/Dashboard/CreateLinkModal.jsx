import { X, Link2, Calendar, Lock } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../api/axios";
import { createLink } from "../../api/link.api";

const createLinkSchema = z.object({
    originalUrl: z
        .string()
        .min(1, "Destination URL is required")
        .url("Enter a valid URL"),

    alias: z
        .string()
        .max(30, "Alias must be less than 30 characters")
        .regex(/^[a-zA-Z0-9-_]*$/, "Only letters, numbers, - and _ are allowed")
        .optional()
        .or(z.literal("")),

    expiry: z.string().optional(),

    password: z
        .string()
        .max(30, "Password must be less than 30 characters")
        .optional()
        .or(z.literal("")),
});

export default function CreateLinkModal({ open, onClose }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createLinkSchema),
        defaultValues: {
            originalUrl: "",
            alias: "",
            expiry: "",
            password: "",
        },
    });

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    const onSubmit = async (data) => {        
        const response = await createLink({...data})
        console.log({data, response});
        
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold">Create New Link</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Shorten, customize and track your URL.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 p-6"
                >
                    {/* Destination URL */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Destination URL
                        </label>

                        <div className="relative">
                            <Link2
                                size={18}
                                className="absolute left-3 top-3 text-slate-400"
                            />

                            <input
                                {...register("originalUrl")}
                                placeholder="https://example.com"
                                className="input pl-10"
                            />
                        </div>

                        {errors.originalUrl && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.originalUrl.message}
                            </p>
                        )}
                    </div>

                    {/* Alias */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Custom Alias
                        </label>

                        <input
                            {...register("alias")}
                            placeholder="my-portfolio"
                            className="input"
                        />

                        {errors.alias && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.alias.message}
                            </p>
                        )}
                    </div>

                    {/* Expiry */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Expiration Date
                        </label>

                        <div className="relative">
                            <Calendar
                                size={18}
                                className="absolute left-3 top-3 text-slate-400"
                            />

                            <input
                                type="date"
                                {...register("expiry")}
                                className="input pl-10"
                            />
                        </div>

                        {errors.expiry && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.expiry.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Password Protection
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-3 text-slate-400"
                            />

                            <input
                                type="password"
                                {...register("password")}
                                placeholder="Optional"
                                className="input pl-10"
                            />
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Creating..." : "Create Link"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}