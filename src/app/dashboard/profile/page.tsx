import { getUserSession } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProfilePage = async () => {
  const { user } = await getUserSession();

  return (
    <div className="p-4 pb-20  min-h-screen">
      <div className="">
        <div className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-12 w-12 cursor-pointer">
                 <AvatarImage src={user?.user_metadata.avatar_url} />
                 <AvatarFallback>{user?.user_metadata.full_name.split(" ")[0].charAt(0)}</AvatarFallback>
                   <span className="sr-only">Toggle user menu</span>
                 </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold">{user?.user_metadata.full_name}</h2>
              <p className="text-gray-400">{user?.email}</p>              
            </div>
          </div>
          <Button className="w-full mt-6">Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
