import { useLocation, Outlet, ScrollRestoration } from "react-router-dom";
import styles from "./Layout.module.sass";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import { AnimatePresence, motion } from "framer-motion";

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />
      <AnimatePresence mode="wait">
        <div className={styles.layout}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar />
            <Outlet />
            <Footer />
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Layout;
