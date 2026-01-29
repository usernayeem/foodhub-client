import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary transition-colors">
                        Terms
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}
