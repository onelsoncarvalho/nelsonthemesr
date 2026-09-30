import { useState, useEffect } from 'react';
import SuccessToast from '../components/SuccessToast.tsx';
import CopyIcon from "@site/static/img/copy_icon.svg";
import { motion, useScroll, useMotionValueEvent, useTransform } from "motion/react";

const Hero: React.FC = () => {
  const [isToastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, [isToastVisible]);

  const handleClipboardAction = (text: string) => {
    navigator.clipboard.writeText(text)
    setToastVisible(true);
  };

  const { scrollYProgress } = useScroll();
  console.log(scrollYProgress)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })
  const position = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-15%"]
  );
  // const size = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [""]
  // )

  return (
    <section className="w-full bg-gradient-to-b from-[#FFF] to-indigo-100">
      <SuccessToast
        text="Copiado para a área de transferência ✅"
        visible={isToastVisible}
      />
      <div className="container mx-auto px-8 md:px-12 py-16 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-12">
        <div className="w-full col-span-full lg:col-span-6 lg:col-start-4 flex flex-col items-center gap-4 text-center">
          <motion.h1
            className="font-main font-bold text-4xl md:text-5xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          >
            The R theme package for making{" "}
            <span className="text-[#492EB7]">beautiful</span> and{" "}
            <span className="text-[#492EB7]">production-ready</span> plots
          </motion.h1>

          <p className="text-slate-700 font-main text-lg">
            With nelsonthemes, you can add carefully prepared themes to improve
            the readability and comprehension of your plots.
          </p>

          <div className="w-full bg-[#492EB7] rounded-lg shadow-inner text-xs md:text-sm p-4 flex flex-row items-center gap-4 max-w-fit">
            <span className="font-fira min-w-0 text-slate-100 break-all">
              remotes::install_github("onelsoncarvalho/nelsonthemes")
            </span>

            <CopyIcon
              title="Copy Icon"
              className="shrink-0 max-w-[20px] max-h-[20px]  hover:bg-slate-400 transition duration-200 cursor-pointer rounded-sm"
              onClick={() =>
                handleClipboardAction(
                  'remotes::install_github("Nelson-DevStack/nelsonthemes")'
                )
              }
            />
          </div>
        </div>

        <div className="w-full col-span-full lg:col-start-4 lg:col-span-6">
          <motion.img
            src={require("@site/static/img/logo_nelsonthemes.png").default}
            style={{ translateY: position }}
          />
        </div>

      </div>
    </section>
  )
}

export default Hero;
