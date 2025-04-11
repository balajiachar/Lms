export const ClerkWebhooks = async (req, res) => {
    try {
        console.log("🔔 Clerk Webhook Received:", req.headers);
        console.log("📦 Body:", req.body);

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created':
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                console.log("✅ User saved to MongoDB");
                return res.json({});

            case 'user.updated':
                const updateData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, updateData);
                console.log("♻️ User updated");
                return res.json({});

            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                console.log("❌ User deleted");
                return res.json({});

            default:
                return res.json({});
        }

    } catch (error) {
        console.error("🚨 Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};
