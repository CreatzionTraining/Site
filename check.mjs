import * as si from "react-icons/si";

const requiredIcons = [
    "SiReact",
    "SiNextdotjs",
    "SiNodedotjs",
    "SiPython",
    "SiGo",
    "SiRust",
    "SiTensorflow",
    "SiAmazonwebservices",
    "SiMicrosoftazure",
    "SiGooglecloud",
    "SiKubernetes",
    "SiDocker",
    "SiTerraform",
    "SiPostgresql",
    "SiMongodb",
    "SiRedis",
    "SiApachekafka",
    "SiApachespark",
    "SiSolidity",
    "SiThreedotjs"
];

for (const icon of requiredIcons) {
    if (!si[icon]) {
        console.log("Missing:", icon);
    } else {
        console.log("Found:", icon);
    }
}
