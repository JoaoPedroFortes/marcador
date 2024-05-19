import { ReactTyped } from "react-typed";
import { useState } from "react";
import auth from "@/Config/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Router, useRouter } from "next/router";
import { setLoggedUser } from "@/utils/cookie/cookie";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const redirectToInicio = () => {
        router.push('/inicio');
    }
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((response) => {
            const user = response.user;
            const { email, photoURL, phoneNumber, accessToken } = user;

            const userCookie = { email, photoURL, phoneNumber, accessToken }
            setLoggedUser(userCookie)
            redirectToInicio()



        }).catch((error) => { console.log(error) })
    }


    return (
        <div className="flex h-screen">
            <div className="w-full lg:w-1/4 bg-black rounded flex flex-col justify-center items-center p-8">
                <form className="w-full" >
                    <h1 className="text-2xl font-bold text-white">Login</h1>
                    <div className="mb-4">
                        <label className="block  text-white text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Senha"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <a
                            href="#"
                            className="inline-block align-baseline font-bold text-sm text-white"
                        >
                            Esqueci minha senha
                        </a>
                    </div>
                    <div>

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Entrar
                        </button>

                    </div>
                </form>
            </div>

            {/* Seção do nome do sistema e slogan */}

            {/* <div className="hidden lg:flex lg:w-3/4 bg-imagem-login bg-cover bg-darcula opacity-70 flex-col pl-2 justify-center items-start text-white" >

                <h1 className="text-5xl font-bold mb-4 ">meuServiço</h1>
                <h3 className="text-2xl"> Uma solução
                    <ReactTyped
                        className="pl-2 text-yellow-400"
                        strings={["simples", "eficiente", "adaptável"]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    ></ReactTyped>
                </h3>
            </div> */}

            <div className="relative hidden lg:flex lg:w-3/4 h-screen">
                {/* Imagem de fundo com camada escura */}
                <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: "url('/assets/agenda.jpg')", filter: "grayscale(100%)", position: "relative" }}>
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                </div>

                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col pl-2 justify-center items-start text-white">
                    <h1 className="text-5xl font-bold mb-4">meuServiço</h1>
                    <h3 className="text-2xl">
                        Uma solução
                        <ReactTyped
                            className="pl-2 text-yellow-400"
                            strings={["simples", "eficiente", "adaptável"]}
                            typeSpeed={40}
                            backSpeed={50}
                            loop
                        />
                    </h3>
                </div>
            </div>

        </div>
    )
}
