import { UserButton } from "@clerk/nextjs"
import { MainNavigationBar } from "@/components/MainNavigationBar"

const NavigationBar = () => {
    return (
        <div className="border-b"> 
            <div className="flex h-16 items-center px-4">
                <div>
                    This will be a store switcher
                </div>
                <MainNavigationBar className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar