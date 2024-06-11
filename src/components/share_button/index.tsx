import { RWebShare } from "react-web-share";
import share_icon from "../../assets/Share.svg"

export default function ShareButton({ title }: { title: string }) {
    return (
        <div data-testid="share-btn">
            <RWebShare
                data={{
                    text: "APP_RECIPE",
                    url: `${window.location.href}`,
                    title: `${title}`,
                }}
                onClick={() => console.log("shared successfully!")}
            >
                <img src={share_icon} alt="" className="ml-12 w-10 lg:w-12" />
            </RWebShare>
        </div>
    )
}