// app/payment-required/page.tsx

import { AlertTriangle, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentRequiredPage() {
  return (
    <div
      dir="ltr"
      className="min-h-screen flex items-center justify-center bg-muted px-4"
    >
      <Card className="max-w-md w-full text-center border-red-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center justify-center gap-2 text-2xl">
            <AlertTriangle className="w-6 h-6" />
            Payment Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Access to this site has been temporarily restricted due to an
            incomplete payment.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please complete your payment or contact us to restore access.
          </p>

          <div className="flex flex-col gap-2 text-sm items-center text-left">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@ebtkar.tech" className="hover:underline">
                contact@ebtkar.tech
              </a>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <a
                href="https://wa.me/218928666458"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp: +218 92 8666 458
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
