import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password required" })
    .min(8, { message: "Must be at least 8 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    console.log(data);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user/login`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("Login successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("An error occured while signing in");
    }
  }

  return (
    <div className="flex items-center justify-center p-4 ">
      <Card className="w-[450px] px-4 py-8">
        <CardHeader>
          <CardDescription className="text-center">Welcome to</CardDescription>
          <CardTitle className="text-center">Chat tau</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="m@gmail" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Guess Login
          </Button>
        </CardFooter>
        <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300 ">
          Don&apos;t have an account?{" "}
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
