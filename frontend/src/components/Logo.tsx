import Image from "next/image";

export default function Logo({ ...rest }) {
  return (
    <>
      <Image
        src="/Strara Mind Logo/logopng.png" // Path is relative to the public folder
        alt="Strara Mind Logo"
        width={100} // Set width
        height={100} // Set height
        {...rest}
      />
    </>
  );
}
