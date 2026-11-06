import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function ExecutiveDirectorMessage() {
  return (
    <section className="relative py-24 overflow-hidden bg-cream/30">
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
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20 relative z-10 bg-primary/5">
              <img 
                src="/executive-director.webp" 
                alt="Executive Director"
                className="w-full h-full object-cover object-top transition-all duration-700"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-6 -left-6 px-6 py-4 bg-accent text-accent-foreground rounded-xl shadow-xl z-20">
              <p className="font-bold text-lg">Executive Director</p>
              <p className="text-xs uppercase tracking-widest font-medium opacity-80">{"\n"}</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3 text-right lg:text-left"
          >
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
              <Quote className="w-8 h-8 text-accent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Executive Director's Message
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                As the Executive Director of the Imam Shah Waliullah Dehlawi Research Institute, my focus is on operationalizing our scholarly vision into impactful research initiatives and academic programs. We are committed to maintaining the highest standards of academic excellence while ensuring our work remains accessible and relevant.
              </p>
              <p>
                Our departments are actively engaged in critical research projects that explore the intersections of Islamic thought and contemporary challenges. Through strategic partnerships and a robust digital infrastructure, we aim to share this knowledge with a global audience, fostering a community of learners and researchers dedicated to intellectual revival.
              </p>
              <p>
                We believe that the legacy of Imam Shah Waliullah offers a roadmap for navigating the complexities of our time, and we invite all seekers of knowledge to engage with our resources and contribute to this vital mission.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex items-center gap-4 justify-end lg:justify-start">
                <p className="font-serif italic text-2xl text-primary opacity-80">
                  Academic Vision & Leadership
                </p>
                <div className="h-1 w-12 bg-accent rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
