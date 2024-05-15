import { ReactTyped } from "react-typed";
import Link from 'next/link';
export default function Login() {
    return (
        <div className="flex h-screen">
            {/* Seção do formulário de login */}
            <div className="w-full lg:w-1/4 bg-gray-300 rounded flex flex-col justify-center items-center p-8">
                <form className="w-full">
                    <div className="mb-4">
                        <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Senha"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <a
                            href="#"
                            className="inline-block align-baseline font-bold text-sm "
                        >
                            Esqueci minha senha
                        </a>
                    </div>
                    <div>
                    <Link href={"/inicio"}>
                        <button
                            type="submit"
                            className="bg-yellow-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Entrar
                        </button>
                        </Link>
                    </div>
                </form>
            </div>

            {/* Seção do nome do sistema e slogan */}
            <div className="hidden lg:flex lg:w-3/4 bg-darcula flex-col pl-2 justify-center items-start text-white">
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
                    
            </div>
        </div>
    )
}
