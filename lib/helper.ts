import html2canvas from "html2canvas";


export const generateThumbnail = async () => {
    const resumeElement = document.getElementById(
        "resume-preview-id"
    ) as HTMLElement;
    if (!resumeElement) {
        console.error("Resume preview element not found");
        return;
    }

    try {
        const canvas = await html2canvas(resumeElement, { scale: 0.5 });
        const thumbnailImage = canvas.toDataURL("image/png");
        return thumbnailImage;
    } catch (error) {
        console.error("Thumbnail generation failed", error);
    }
};

export const formatFileName = (title: string, useHyphen: boolean = true) => {
    const delimiter = useHyphen ? "-" : "_";
    return title.trim().replace(/\s+/g, delimiter) + "pdf";
};

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}