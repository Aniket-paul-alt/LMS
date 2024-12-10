import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {
    const [signupInput, setSignupInput] = useState({name:"", email: "", password: ""})
    const [loginInput, setLoginInput] = useState({email: "", password: ""})

    const handleChangeInput =(e, type) =>{
        const {name, value} = e.target

        if(type === 'signup'){
            setSignupInput({...signupInput, [name]:value})
        }else{
            setLoginInput({...loginInput, [name]:value})
        }
    }

    const handleRegistration = (type) =>{
        const inputData = type === 'signup' ? signupInput : loginInput

        console.log(inputData)
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" placeholder="John Doe" required
                                name = "name"
                                value={signupInput.name}
                                onChange = {(e)=> handleChangeInput(e, 'signup')}
                                 />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" placeholder="john@doe.com" required
                                name = "email"
                                value={signupInput.email}
                                onChange = {(e)=> handleChangeInput(e, 'signup')}
                                 />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" placeholder="password" required
                                name = "password"
                                value={signupInput.password}
                                onChange = {(e)=> handleChangeInput(e, 'signup')}
                                 />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick = {()=> handleRegistration('signup')}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your password here. After signup, you'll be logged in.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" placeholder="john@doe.com" required
                                name = "email"
                                value={loginInput.email}
                                onChange = {(e)=> handleChangeInput(e, 'login')}
                                 />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" placeholder="password" required
                                name = "password"
                                value={loginInput.password}
                                onChange = {(e)=> handleChangeInput(e, 'login')}
                                 />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick = {()=> handleRegistration('login')}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login
