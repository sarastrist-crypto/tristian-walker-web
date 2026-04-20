import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="about" style={{ padding: '8rem 0', background: 'var(--bg-base)', overflow: 'hidden' }}>
      <motion.div 
        className="wrap" 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'center' }}
      >
        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%', height: '560px', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            
            {/* The Static Center Planet */}
            <div 
              style={{
                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 10
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(4.5rem, 9vw, 6.5rem)', color: 'var(--accent-primary)', lineHeight: 0.85 }}>20</div>
              <div style={{ fontSize: 'clamp(10px, 2vw, 12.5px)', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 900, color: 'var(--text-main)', marginTop: '1.25rem' }}>Years</div>
            </div>

            {/* Subdued Ring Decoration */}
            <div style={{ position: 'absolute', inset: '8%', borderRadius: '50%', border: '1px dashed rgba(188,116,78,0.25)', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: '28%', borderRadius: '50%', border: '1px solid rgba(188,116,78,0.08)', zIndex: 1 }} />

            {/* Perfect Horizontal Moons */}
            {[
              { title: "Corporate Leadership", top: "-2%", left: "50%", x: "-50%", delay: 0 },
              { title: "Power of Personal Agency", top: "20%", right: "-8%", x: "0%", delay: 1.2 },
              { title: "Hospitality Leadership", bottom: "20%", right: "-8%", x: "0%", delay: 2.5 },
              { title: "Mastery of Process", bottom: "-2%", left: "50%", x: "-50%", delay: 0.8 },
              { title: "Global Lectures", bottom: "20%", left: "-8%", x: "0%", delay: 3.1 },
              { title: "Strategic Advisory", top: "20%", left: "-8%", x: "0%", delay: 1.8 },
            ].map((moon, i) => (
              <motion.div 
                key={i}
                initial={{ x: moon.x, opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ y: [-7, 7, -7] }}
                transition={{ 
                  opacity: { duration: 1 },
                  y: { duration: 7, delay: moon.delay, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  position: 'absolute',
                  top: moon.top, bottom: moon.bottom, left: moon.left, right: moon.right,
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
                  padding: '0.75rem 1.25rem', borderRadius: '99px',
                  border: '1px solid rgba(188,116,78,0.25)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                  fontSize: 'clamp(8.5px, 1.2vw, 10.5px)', letterSpacing: '0.2em', textTransform: 'uppercase', 
                  fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 15
                }}
              >
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                {moon.title}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Narrative Right Column */}
        <motion.div variants={itemVariants}>
          <h2 style={{ fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)', lineHeight: 1.1, margin: '0 0 2rem', letterSpacing: '-0.015em' }}>
            A life spent inside the <em style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>interaction nobody meant to lose.</em>
          </h2>
          <div style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--text-main)', maxWidth: '36em', margin: 0, fontWeight: 500 }}>
              Before the lecture circuit, Tristian Walker built a 20-year foundation across high-stakes corporate management and elite hospitality leadership. 
            </p>
          </div>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '36em' }}>
            He is the author of <em style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>The Quiet Line</em> and now works with institutions where the stakes of a human interaction are impossible to automate away — operating rooms, concert halls, trading floors, and executive retreats.
          </p>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '36em' }}>
            The through-line of his work is simple: drift is what happens when you perform the task perfectly, but lose the human entirely. He helps leaders find the flicker — that preceding moment of awareness — and build a practice around it. The audience remains the same whether it's an operating room or an executive retreat: people who are highly capable, but quietly disconnected.
          </p>
          <motion.p 
            whileHover={{ x: 5 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--accent-primary)', fontSize: '1.05rem', marginTop: '2.5rem', cursor: 'default' }}
          >
            — From drift to direction, one honest reckoning at a time.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
