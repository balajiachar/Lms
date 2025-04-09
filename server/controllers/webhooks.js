import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User With database

export const ClerkWebhooks = async (req, res) => {
    console.log("✅ Webhook endpoint hit");

    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(req.rawBody, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        console.log("✅ Webhook verified:", req.body.type);

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                console.log("📦 Creating user:", userData);
                await User.create(userData);
                return res.json({ success: true });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                console.log("📦 Updating user:", userData);
                await User.findByIdAndUpdate(data.id, userData);
                return res.json({ success: true });
            }

            case 'user.deleted': {
                console.log("🗑️ Deleting user:", data.id);
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true });
            }

            default:
                console.log("⚠️ Unhandled event type:", type);
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }

    } catch (error) {
        console.error("❌ Webhook error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}
