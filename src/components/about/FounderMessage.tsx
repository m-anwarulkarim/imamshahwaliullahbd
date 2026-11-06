import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function FounderMessage() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary/5">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Image/Portrait Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20 relative z-10 bg-primary/5">
              <img
                src="/founder.webp"
                alt="Dr. Shahidul Islam Faruqi, Founder"
                className="w-full h-full object-cover object-top transition-all duration-700"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-6 -left-6 px-6 py-4 bg-primary text-white rounded-xl shadow-xl z-20">
              <p className="font-bold text-lg">Dr. Shahidul Islam Faruqi</p>
               <p className="text-xs text-accent uppercase tracking-widest font-medium">EXECUTIVE DIRECTOR&nbsp;</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5">
              <Quote className="w-8 h-8 text-accent" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Executive Director's Message
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                All praise is due to Allah, who has blessed us with the opportunity to serve the cause of knowledge.
                This institute was founded with a singular vision: to revive and preserve the rich intellectual
                heritage of Imam Shah Waliullah Dehlawi (Rah.) and present it to the modern world.
              </p>
              <p>
                From a humble beginning, our journey has been one of dedication, research, and unwavering commitment
                to authentic scholarship. We believe that the answers to many of today's challenges lie within the
                balanced, comprehensive methodology of our classical scholars — a methodology Imam Shah Waliullah
                embodied throughout his life.
              </p>
              <p>
                I am grateful to every researcher, student, and well-wisher who walks this path with us. May Allah
                accept our humble efforts and make this institute a beacon of knowledge for generations to come.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-accent rounded-full" />
                <p className="font-serif italic text-2xl text-primary opacity-80">
                  Dr. Shahidul Islam Faruqi
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
