import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";

const AddToBagLink = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<a href="#" className="focus-ring text-terracotta rounded-sm text-sm font-semibold hover:text-pine">
          Add to bag →
        </a>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="py-3">
            <DialogTitle className="flex flex-row items-center justify-center"><LogIn className="mr-2" size="20" />Sign in first to add items</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <a
              href="/sign-up"
              className="block focus-ring bg-pine w-full rounded-full px-6 py-3 text-sm text-center font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 mb-4"
            >Sign Up</a>
            <a href="/sign-in" className="block focus-ring bg-terracotta w-full rounded-full px-6 py-3 text-sm text-center font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">Sign in</a>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddToBagLink;