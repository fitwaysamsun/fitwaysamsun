import { useState, useEffect } from "react";
import * as contentful from "contentful";

// إعداد Contentful
const CONTENTFUL_SPACE_ID = "p5kasvv6kj11";
const CONTENTFUL_ACCESS_TOKEN = "KSrKb2kKdkgzTYeBgbh6kIe3yvLctdTM51QjpLPisqM";

const client = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
});

interface TrainerVideo {
    title: string;
    videoUrl: string;
}

const Videos = () => {
    const [trainerVideos, setTrainerVideos] = useState<TrainerVideo[]>([]);
    const [otherVideos, setOtherVideos] = useState<TrainerVideo[]>([]);
    const [loading, setLoading] = useState(true);

    // فيديوهات الفروع الثابتة
    const branchVideos = [
        {
            title: "Yenimahalle Şubesi",
            embedUrl: "https://www.instagram.com/p/DEHi7K6MeGl/embed",
            instagramUrl: "https://www.instagram.com/p/DEHi7K6MeGl/",
            color: "green"
        },
        {
            title: "Mimarsinan Şubesi",
            embedUrl: "https://www.instagram.com/p/C8SgOFtsxSY/embed",
            instagramUrl: "https://www.instagram.com/p/C8SgOFtsxSY/",
            color: "blue"
        }
    ];

    // جلب فيديوهات المدربين من Contentful
    useEffect(() => {
        const fetchTrainerVideos = async () => {
            setLoading(true);
            try {
                const response = await client.getEntries({
                    content_type: "egitmenVideolari",
                    limit: 20,
                });

                const videos: TrainerVideo[] = response.items.map((entry: any) => ({
                    title: entry.fields.title || "فيديو بدون عنوان",
                    videoUrl: entry.fields.videoUrl || "",
                }));

                setTrainerVideos(videos);

                // Fetch Other Videos
                const otherResponse = await client.getEntries({
                    content_type: "digerVideolar",
                    limit: 20,
                });

                const otherVids: TrainerVideo[] = otherResponse.items.map((entry: any) => ({
                    title: entry.fields.name || "فيديو بدون عنوان",
                    videoUrl: entry.fields.videoUrl || "",
                }));

                setOtherVideos(otherVids);
            } catch (err) {
                console.error("Error fetching trainer videos from Contentful:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainerVideos();
    }, []);

    // دالة لتحويل رابط Instagram إلى صيغة embed
    const getEmbedUrl = (url: string): string => {
        if (!url) return "";

        // إذا كان الرابط يحتوي على /embed بالفعل، أرجعه كما هو
        if (url.includes("/embed")) {
            return url;
        }

        // إزالة / من نهاية الرابط إن وجدت
        const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;

        // إضافة /embed
        return `${cleanUrl}/embed`;
    };

    return (
        <section id="videos" className="py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Main Section Title */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight pb-2">
                        Videolar
                    </h2>

                </div>

                {/* Şube Tanıtım Videoları */}
                <div className="mb-16">
                    <div className="text-center mb-6">
                        <p className="text-4xl text-muted-foreground max-w-2xl mx-auto">
                            Şube Tanıtım Videoları
                        </p>
                    </div>
                    <div className={branchVideos.length === 1 ? "flex justify-center max-w-4xl mx-auto" : "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"}>
                        {branchVideos.map((video, index) => (
                            <div key={index} className={`flex flex-col ${branchVideos.length === 1 ? "w-full md:w-1/2" : ""}`}>
                                {/* Branch Title */}
                                <div className="flex justify-center mb-4">
                                    <span className={`bg-${video.color}-600 text-white px-5 py-2.5 rounded-xl text-lg font-medium`}>
                                        {video.title}
                                    </span>
                                </div>

                                {/* Video Container */}
                                <div className="relative w-full rounded-lg overflow-hidden shadow-card hover:shadow-fitness transition-all duration-300 bg-secondary/20" style={{ height: '590px' }}>
                                    <iframe
                                        src={video.embedUrl}
                                        className="absolute left-0 w-full"
                                        style={{ height: '850px', top: '0' }}
                                        frameBorder="0"
                                        scrolling="no"
                                        allowTransparency={true}
                                        allow="encrypted-media"
                                        title={video.title}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Eğitmen Videoları */}
                <div>
                    <div className="text-center mb-6">
                        <p className="text-4xl text-muted-foreground max-w-2xl mx-auto">
                            Eğitmen Videoları
                        </p>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-xl text-muted-foreground">Yükleniyor...</p>
                        </div>
                    ) : trainerVideos.length > 0 ? (
                        <div className={trainerVideos.length === 1 ? "flex justify-center max-w-4xl mx-auto" : "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"}>
                            {trainerVideos.map((video, index) => (
                                <div key={index} className={`flex flex-col ${trainerVideos.length === 1 ? "w-full md:w-1/2" : ""}`}>
                                    {/* Video Container */}
                                    <div className="relative w-full rounded-lg overflow-hidden shadow-card hover:shadow-fitness transition-all duration-300 bg-secondary/20" style={{ height: '590px' }}>
                                        <iframe
                                            src={getEmbedUrl(video.videoUrl)}
                                            className="absolute left-0 w-full"
                                            style={{ height: '850px', top: '0' }}
                                            frameBorder="0"
                                            scrolling="no"
                                            allowTransparency={true}
                                            allow="encrypted-media"
                                            title={video.title}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground italic">
                            Henüz eğitmen videosu eklenmemiş.
                        </p>
                    )}
                </div>

                {/* Diğer Videolar */}
                <div className="mt-16">
                    <div className="text-center mb-6">
                        <p className="text-4xl text-muted-foreground max-w-2xl mx-auto">
                            Diğer Videolar
                        </p>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-xl text-muted-foreground">Yükleniyor...</p>
                        </div>
                    ) : otherVideos.length > 0 ? (
                        <div className={otherVideos.length === 1 ? "flex justify-center max-w-4xl mx-auto" : "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"}>
                            {otherVideos.map((video, index) => (
                                <div key={index} className={`flex flex-col ${otherVideos.length === 1 ? "w-full md:w-1/2" : ""}`}>
                                    {/* Video Container */}
                                    <div className="relative w-full rounded-lg overflow-hidden shadow-card hover:shadow-fitness transition-all duration-300 bg-secondary/20" style={{ height: '590px' }}>
                                        <iframe
                                            src={getEmbedUrl(video.videoUrl)}
                                            className="absolute left-0 w-full"
                                            style={{ height: '850px', top: '0' }}
                                            frameBorder="0"
                                            scrolling="no"
                                            allowTransparency={true}
                                            allow="encrypted-media"
                                            title={video.title}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground italic">
                            Henüz diğer video eklenmemiş.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Videos;
