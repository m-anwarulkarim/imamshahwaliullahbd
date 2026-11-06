import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function ChairmanMessage() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image/Portrait Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/20 relative z-10 bg-primary/5">
              <img 
                src="/chairman.webp" 
                alt="Shaykh Muhammad Salman, Chairman"
                className="w-full h-full object-cover transition-all duration-700"
              />

            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-6 -right-6 px-6 py-4 bg-primary text-white rounded-xl shadow-xl z-20">
              <p className="font-bold text-lg">Shaykh Muhammad Salman</p>
              <p className="text-xs text-accent uppercase tracking-widest font-medium">CHAIRMAN</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5">
              <Quote className="w-8 h-8 text-accent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Chairman's Message
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                In the name of Allah, the Most Gracious, the Most Merciful. 
                Our institute is dedicated to bridging the gap between classical Islamic wisdom and the complexities of the modern world. 
                The intellectual legacy of Imam Shah Waliullah Dehlawi provides us with a profound framework for this endeavor.
              </p>
              <p>
                Shah Waliullah was not merely a scholar of the past; his methodology of <span className="text-primary font-semibold italic">Tatbiq</span> (reconciliation) and his vision of a balanced society remain more relevant today than ever. 
                Our mission is to foster a new generation of researchers who can interpret these timeless principles for our contemporary context.
              </p>
              <p>
                I invite you to join us in this journey of knowledge, research, and reform. Together, we can contribute to the intellectual revival of the Ummah.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-accent rounded-full" />
                <p className="font-serif italic text-2xl text-primary opacity-80">
                  Shaykh Muhammad Salman
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
