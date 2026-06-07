
import { InviteUserForm } from "./invite-form";

export default function InviteUserPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Invite New User</h1>
        <p className="text-muted-foreground">
          Create a new user account and assign them a role. They will need to use the 'Forgot Password' link to set their password.
        </p>
      </div>
      <InviteUserForm />
    </div>
  );
}

    