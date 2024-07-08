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

const Login = () => {
  return (
    <div className="flex items-center justify-center m-12">
      <Card className="w-[450px] p-4">
        <CardHeader>
          <CardDescription className="text-center">Welcome to</CardDescription>
          <CardTitle className="text-center">Chat tau</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 py-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@gmail.com" />
          </div>
          <div className="grid gap-2 py-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full mx-4">Sign In</Button>
          <Button variant="outline" className="w-full">
            Guess Login
          </Button>
        </CardFooter>
        <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300 ">
          Don't have an account?{" "}
          <span className="font-bold text-blue-500">
            {" "}
            <Link to="/signup"> Sign Up </Link>
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Login;
