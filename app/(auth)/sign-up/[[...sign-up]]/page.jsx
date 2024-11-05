import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <>
            <div className="">
                <div className="container max-w-[1600px]">
                    <div className="flex items-center justify-center h-screen w-[100%]">
                        <SignUp />
                    </div>
                </div>
            </div>
        </>
    )
}