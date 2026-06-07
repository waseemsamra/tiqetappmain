
import { getUserById } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { UserForm } from "../../user-form";

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const user = await getUserById(params.id);

    if (!user) {
        notFound();
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
                <p className="text-muted-foreground">Update details for {user.email}</p>
            </div>
            <UserForm user={user} />
        </div>
    );
}
