# Initialize + Save Services
Service.create(name: "Manicure", description: "Regular polish, gel polish, or gel-extensions. Includes sugar scrub, hot towels, and 5 minute massage.", price: 45,image_url: "https://serenity-springs-assets.s3.amazonaws.com/manicure.jpg", service_type_id: 3, duration_id: 2)
Service.create(name: "Pedicure", description: "Regular or gel polish. Includes sugar scrub, mask, hot towels, and 10 minute massage.", price: 50, image_url: "https://serenity-springs-assets.s3.amazonaws.com/pedicure.jpg", service_type_id: 3, duration_id: 2)
Service.create(name: "Haircut", description: "Haircut and style.", price: 30, image_url: "https://serenity-springs-assets.s3.amazonaws.com/haircut.jpg", service_type_id: 3, duration_id: 2)
Service.create(name: "Blowout / Hot Tool styles", description: "Blow dry with a round brush that makes the hair bouncy and voluminous.", price: 50, image_url: "https://serenity-springs-assets.s3.amazonaws.com/blowout.jpg", service_type_id: 3, duration_id: 2)
Service.create(name: "Henna Color", description: "Henna is a natural alternative to traditional hair color, available in natural hair colors.", price: 40, image_url: "https://serenity-springs-assets.s3.amazonaws.com/hennaColor.jpg", service_type_id: 3, duration_id: 2)
Service.create(name: "Hair / Scalp treatments", description: "Hair treatments provided can moisturize, add strength, or treat dry scalp depending on clients needs.", price: 25, image_url: "https://serenity-springs-assets.s3.amazonaws.com/hairTreatment.jpg", service_type_id: 3, duration_id: 6)
Service.create(name: "Free Wig Installation", description: "Let's get your wig on!", price: 0, image_url: "https://serenity-springs-assets.s3.amazonaws.com/wigs.jpg", service_type_id: 3, duration_id: 6)
Service.create(name: "Swedish Massage, 60 min", description: "Relaxes the body and relieves pain in muscles with slow calming strokes.", price: 80, image_url: "https://serenity-springs-assets.s3.amazonaws.com/swedishMassage.jpg", service_type_id: 4, duration_id: 5)
Service.create(name: "Chair Massage, 15 min", description: "Done while sitting using compression to relieve tension.", price: 20, image_url: "https://serenity-springs-assets.s3.amazonaws.com/chairMassage.jpg", service_type_id: 4, duration_id: 1)
Service.create(name: "Chair Massage, 30 min", description: "Done while sitting using compression to relieve tension.", price: 35, image_url: "https://serenity-springs-assets.s3.amazonaws.com/chairMassage.jpg", service_type_id: 4, duration_id: 3)


# Confirm Seeding Has Completed
puts '🌱 Seeding Done!'