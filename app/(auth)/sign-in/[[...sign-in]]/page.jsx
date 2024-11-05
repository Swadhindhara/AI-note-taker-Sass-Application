import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <>
            <div className="">
                <div className="container max-w-[1600px]">
                    <div className="flex items-center justify-center w-full h-screen">
                        <SignIn />
                    </div>
                </div>
            </div>
        </>
    )
}