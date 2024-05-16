import Image from "next/image";
import { ContainerMessages } from "./containers";

export default function InitialMessage() {
    return (
        <ContainerMessages className="justify-center items-center">
            <Image
                src={'/assets/messenger.svg'}
                alt={"Svg Image"}
                width={400}
                height={400}
                priority
            />
        </ContainerMessages>
    )
}