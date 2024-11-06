import LogoSVG from "@/assets/logo-medium.svg";
import Button from "@/lib/@core/Button";

const Footer = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between border-t border-stroke px-6 pt-6 pb-6">
      <p className="text-2xl font-normal">HYPERFLEX</p>

      <div className="flex gap-12 text-grays">
        <a
          href="https://x.com/Flex_strk"
          target="_blank"
          className="flex items-center gap-2"
          rel="noopener noreferrer"
        >
          <p>Twitter</p>
        </a>
        <a
          href="https://discord.com/invite/Xv3pp9mtRV"
          target="_blank"
          className="flex items-center gap-2"
          rel="noopener noreferrer"
        >
          <p>Discord</p>
        </a>
      </div>
      {/* <div className="flex  justify-between">
        <div>
          <IImage src={LogoSVG} alt="" />
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-monument text-xl font-normal">Homepage</p>
          <a href="">Collections</a>
          <a href="">Activities</a>
          <a href="">Launchpad</a>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-monument text-xl font-normal">Info</p>
          <a href="">About</a>
          <a href="">Support</a>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-monument text-xl font-normal">Partners</p>
          <a href="">Nethermind</a>
          <a href="">StarkDefi</a>
          <a href="">Braavos</a>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-xl font-normal">Join Our Community</p>
          <div>
            <p className="text-sm text-grays">
              Keep in touch with us via Discord of Flex
            </p>
            <p className="text-sm text-grays">
              Contribute your ideas and be part
            </p>
          </div>

          <Button title="Connect to Discord" />
        </div>
      </div>

      <div className="mt-10 border-t border-stroke py-4 text-center text-sm text-grays">
        <p>
          Copyright © 2024 RYG.Labs. All rights reserved. Powered by RYG.Labs
          🚀
        </p>
      </div> */}
    </div>
  );
};

export default Footer;
