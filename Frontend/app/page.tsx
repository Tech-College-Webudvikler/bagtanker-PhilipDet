"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";

const slides = [
    "/assets/images/slides/bread-slidebg-01.jpg",
    "/assets/images/slides/bread-slidebg-02.jpg",
    "/assets/images/slides/bread-slidebg-03.jpg",
    "/assets/images/slides/bread-slidebg-04.jpg",
];
const AUTOPLAY_INTERVAL = 5000;

export default function FullScreenBackgroundSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: false,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, AUTOPLAY_INTERVAL);
        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <>
            <div className="z-30 relative w-full flex-1 overflow-hidden">
                <div className="absolute top-12 left-12 text-white max-w-md">
                    <h1 className="text-4xl font-bold">Nyheder</h1>
                    <p className="mt-4">
                        Her kan du vise tekst, knapper eller hvad du vil ovenpå
                        baggrunden.
                    </p>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === selectedIndex
                                    ? "bg-white"
                                    : "bg-white/60"
                            }`}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>

            <div
                className="embla -z-10 fixed inset-0 overflow-hidden"
                ref={emblaRef}
            >
                <div className="embla__container flex h-full">
                    {slides.map((src, index) => (
                        <div
                            className="embla__slide w-full shrink-0"
                            key={index}
                        >
                            <Image
                                src={src}
                                alt={`Slide ${index}`}
                                className="w-full h-full object-cover"
                                width={1920}
                                height={1080}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
