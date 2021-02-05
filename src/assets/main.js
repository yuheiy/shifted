import "./main.scss";
import "wicg-inert";
import { Application } from "stimulus";
import { definitions } from "./controllers";

// load all asset files to be passed to file-loader
require.context(
	".",
	true,
	/\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/
);

if (process.env.NODE_ENV !== "production") {
	console.log({
		NODE_ENV: process.env.NODE_ENV,
		PATH_PREFIX: process.env.PATH_PREFIX,
	});
}

const application = Application.start();
definitions.forEach(async (definitionLoaded) => {
	application.load(await definitionLoaded);
});

if (process.env.NODE_ENV !== "production") {
	window.application = application;
}
