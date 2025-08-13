import { usePage } from "@inertiajs/react";
import profile_image from "../../../public/images/placeholder_image.jpg";
import Button from "../Components/UI/Button";

export default function Profile() {
  const { auth } = usePage().props;

  return (
    <div className="flex flex-col items-center space-y-3 bg-white p-4 rounded-xl shadow">
      <input
        type="image"
        src={profile_image}
        alt="sdfa"
        className="w-20 h-20 rounded-full"
      />
      <h1 className="font-bold text-xl">{auth.user.name}</h1>
      <h1 className="text-gray-600 text-medium">{auth.user.username}</h1>

      <Button label="Update your profile" />
    </div>
  );
}
