// Result.jsx — The image generation page
// Users type a prompt, hit Generate, and the app calls the backend
// which uses the ClipDrop API to return an AI-generated image.

import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Result = () => {
    // Start with a sample image as a placeholder before the user generates
    const [image, setImage] = useState(assets.sample_img_1)
    const [isImageLoaded, setisImageLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')

    const { generateImage } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (input) {
            const generatedImage = await generateImage(input)
            if (generatedImage) {
                setisImageLoaded(true)
                setImage(generatedImage)
            }
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col justify-start items-center px-4 pt-10">

            {/* Image display with an animated loading bar at the bottom */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <img src={image} alt="" className="max-w-sm rounded-md" />
                    {/* Loading bar animates across the bottom of the image when generating */}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
                </div>
                <p className={!loading ? 'hidden' : ''}>Loading.....</p>
            </div>

            {/* Prompt input — hidden once an image has been generated */}
            <motion.form
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={onSubmitHandler}
                className="w-full flex justify-center mt-20"
            >
                {!isImageLoaded &&
                    <div className="flex w-full max-w-2xl bg-[#5A5A5A] rounded-full overflow-hidden">
                        <input
                            onChange={e => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Describe what you want to generate"
                            className="flex-grow bg-[#5A5A5A] text-white outline-none px-6 py-3 text-base placeholder-gray-300"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white w-[140px] py-3 text-base font-semibold rounded-full"
                        >
                            Generate
                        </button>
                    </div>
                }
            </motion.form>

            {/* After generation: show options to generate another or download */}
            {isImageLoaded &&
                <div className="flex gap-4 flex-wrap justify-center text-sm mt-8">
                    <p
                        onClick={() => { setisImageLoaded(false) }}
                        className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
                    >
                        Generate Another
                    </p>
                    <a
                        href={image}
                        download
                        className="bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer"
                    >
                        Download
                    </a>
                </div>
            }
        </div>
    )
}

export default Result
