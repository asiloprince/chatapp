import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),
    password: z
      .string()
      .min(1, { message: "Password required" })
      .min(8, { message: "Must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password required" })
      .min(8, { message: "Must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const Signup = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      toast("Register successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast("An error occured while signing up");
    }
  }
  return (
    <div className="lg:col-span-1">
      <Header />
      <div className="flex items-center justify-center ">
        <Card className="w-[450px] p-4">
          <CardHeader>
            <CardTitle className="text-center">
              <p className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Chat tau
              </p>
            </CardTitle>
            <CardDescription className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
              You and your friends always connected!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Full Name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@gmail.com" {...field} />
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
                        <Input placeholder="Enter your Password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="pb-4">
                      <FormLabel> Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Confirm your Password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">Sign Up</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Already have an account?
              <span className="font-bold text-blue-500">
                <Link to="/login"> Sign In</Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>{" "}
    </div>
  );
};

export default Signup;
