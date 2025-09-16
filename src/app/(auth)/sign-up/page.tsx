import { Card } from "@/components/ui/card";
import { SignUpViews } from "@/modules/auth/ui/views/sign-up-views";

const Page = () => {
    return (
        console.log("SignUp Page rendered"),

        <Card>
            <SignUpViews />
        </Card>

    );
}

export default Page;

