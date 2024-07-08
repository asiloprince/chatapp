import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    // <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

    //   <form className="my-8">
    //     <Label htmlFor="firstname">Full Name</Label>
    //     <Input id="name" placeholder="Tyler" type="text" />

    //     <Label htmlFor="email">Email Address</Label>
    //     <Input id="email" placeholder="projectmayhem@fc.com" type="email" />

    //     <Label htmlFor="password">Password</Label>
    //     <Input id="password" placeholder="••••••••" type="password" />

    //     <Label htmlFor="password">Confirm Password</Label>
    //     <Input id="password" placeholder="••••••••" type="password" />

    //     <Button className="w-full mx-4">Sign In</Button>
    //   </form>
    // </div>

    <div className="flex items-center justify-center ">
      <Card className="w-[450px] p-4">
        <CardHeader>
          <CardTitle className="text-center">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome to Chat tau
            </h2>
          </CardTitle>
          <CardDescription className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
            You and your friends always connected!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 py-2">
            <Label htmlFor="email">Full Name</Label>
            <Input id="name" type="text" />
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@gmail.com" />
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button className="w-full mx-4">Sign Up</Button>

          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Already have an account?
            <span className="font-bold text-blue-500">
              {" "}
              <Link to="/login"> Sign In</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
