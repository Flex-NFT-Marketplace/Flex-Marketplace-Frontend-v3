import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";

const ViewNFT = () => {
  return (
    <div className="mx-auto flex w-full max-w-[950px] flex-col gap-6 px-5 py-8">
      <div className="flex w-full flex-col text-center">
        <p className="text-[24px] font-bold uppercase leading-[30px]">
          view nft
        </p>
        <p className="text-base leading-5 text-gray">
          Each NFT will follow with each metadata{" "}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex w-full gap-4">
          <ImageKit
            className="aspect-square max-w-[272px]"
            src="https://s3-alpha-sig.figma.com/img/f82e/ba70/02adcc91f9f1da6e7477b0efdb50ff30?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=puqoBnJxgdHGvR60p2KZNjWEILzWgEM-ApvQN04u86-~~YqslUv8e-HvvpD9FSAvac41wjBq2z3g-l9u6v-TQmZ11JghZvOzS4y-zdAkvTJfqXysJpPEdJFYJMvm2fqD~WkMGy6qJnv6KM0YIjsovPrf5O4hDx5Ne5eYpzxvUOr52ukutSCjdMJiOiPHFFHZ8fGclTaPFwQus8TM08oiZT~PohpB7l4kT02ejmWjXMn6-qBvbdD3lrodz5KHfHN~rSjkiKZBWoGRssUJU2EeV~PmO9FSxzQ~i9U2GXefJvUoGPC4UrabmUTImrS3SvEshk7PiK0eWuSSt6z~1hanQg__"
          />
          <div className="grid flex-1 grid-cols-2 gap-4">
            <div className="flex h-fit flex-col gap-3 rounded border border-border p-3 ">
              <div className="flex w-full text-base leading-5">
                <p className="min-w-[84px] text-gray">Type:</p>
                <p className="">Outwear</p>
              </div>
              <div className="flex w-full items-center text-base leading-5">
                <p className="min-w-[84px] text-gray">Sub-type:</p>
                <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                  Outwear
                </p>
              </div>
            </div>
            <div className="flex h-fit flex-col gap-3 rounded border border-border p-3 ">
              <div className="flex w-full text-base leading-5">
                <p className="min-w-[84px] text-gray">Type:</p>
                <p className="">Outwear</p>
              </div>
              <div className="flex w-full items-center text-base leading-5">
                <p className="min-w-[84px] text-gray">Sub-type:</p>
                <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                  Outwear
                </p>
              </div>
            </div>
            <div className="flex h-fit flex-col gap-3 rounded border border-border p-3 ">
              <div className="flex w-full text-base leading-5">
                <p className="min-w-[84px] text-gray">Type:</p>
                <p className="">Outwear</p>
              </div>
              <div className="flex w-full items-center text-base leading-5">
                <p className="min-w-[84px] text-gray">Sub-type:</p>
                <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                  Outwear
                </p>
              </div>
            </div>
            <div className="flex h-fit flex-col gap-3 rounded border border-border p-3 ">
              <div className="flex w-full text-base leading-5">
                <p className="min-w-[84px] text-gray">Type:</p>
                <p className="">Outwear</p>
              </div>
              <div className="flex w-full items-center text-base leading-5">
                <p className="min-w-[84px] text-gray">Sub-type:</p>
                <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                  Outwear
                </p>
              </div>
            </div>
            <div className="flex h-fit flex-col gap-3 rounded border border-border p-3 ">
              <div className="flex w-full text-base leading-5">
                <p className="min-w-[84px] text-gray">Type:</p>
                <p className="">Outwear</p>
              </div>
              <div className="flex w-full items-center text-base leading-5">
                <p className="min-w-[84px] text-gray">Sub-type:</p>
                <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                  Outwear
                </p>
              </div>
            </div>
            <div className="flex h-fit flex-col gap-3 rounded border border-border p-3 ">
              <div className="flex w-full text-base leading-5">
                <p className="min-w-[84px] text-gray">Type:</p>
                <p className="">Outwear</p>
              </div>
              <div className="flex w-full items-center text-base leading-5">
                <p className="min-w-[84px] text-gray">Sub-type:</p>
                <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                  Outwear
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-none border-primary"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default ViewNFT;
