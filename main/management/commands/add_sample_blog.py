from django.core.management.base import BaseCommand
from main.models import BlogPost
from django.utils import timezone
from django.core.files.base import ContentFile
import urllib.request
import os

class Command(BaseCommand):
    help = 'Add sample blog posts for Diamond Band news'

    def handle(self, *args, **options):
        # Sample blog posts data
        posts_data = [
            {
                'title': 'Diamond Band Announces New Album Release',
                'slug': 'diamond-band-new-album',
                'content': '''
                <p>Diamond Band is excited to announce the release of our latest album, "Harmony in the Heart," featuring our signature blend of Christian and jazz influences. This collection showcases our journey and growth as musicians dedicated to spreading positive messages through music.</p>
                
                <p>The album includes 12 tracks, each telling a story of faith, love, and perseverance. Standout tracks include "Grace Notes" and "Rhythm of Redemption," which have already been receiving airplay on Christian radio stations.</p>
                
                <p>Pre-order now available on our website. Release date: December 15, 2025.</p>
                ''',
                'excerpt': 'Diamond Band announces their new album "Harmony in the Heart" with Christian and jazz influences.',
                'featured_image_url': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
                'is_featured': True,
                'status': 'published',
            },
            {
                'title': 'First Love Music Streaming Now Available',
                'slug': 'first-love-music-streaming',
                'content': '''
                <p>We're thrilled to announce that First Love Music's debut single "Eternal Flame" is now available on all major streaming platforms! Listen to our soulful Christian music that touches hearts and uplifts spirits.</p>
                
                <p>Stream on:</p>
                <ul>
                    <li><a href="https://spotify.com" target="_blank">Spotify</a></li>
                    <li><a href="https://apple.com/music" target="_blank">Apple Music</a></li>
                    <li><a href="https://youtube.com" target="_blank">YouTube Music</a></li>
                    <li><a href="https://deezer.com" target="_blank">Deezer</a></li>
                    <li><a href="https://tidal.com" target="_blank">Tidal</a></li>
                </ul>
                
                <p>Follow us on social media for updates on upcoming releases and live performances.</p>
                ''',
                'excerpt': 'First Love Music\'s "Eternal Flame" now streaming on all major platforms.',
                'featured_image_url': 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=800',
                'is_featured': True,
                'status': 'published',
            },
            {
                'title': 'Upcoming Diamond Band Christmas Concert - Book Now!',
                'slug': 'diamond-band-christmas-concert',
                'content': '''
                <p>Join Diamond Band for a special Christmas concert featuring holiday classics and original songs celebrating the season. Our performance will include both traditional carols and contemporary Christian music arrangements.</p>
                
                <p><strong>Event Details:</strong></p>
                <ul>
                    <li>Date: December 20, 2025</li>
                    <li>Time: 7:00 PM</li>
                    <li>Venue: Community Center Auditorium</li>
                    <li>Tickets: $25 (includes holiday refreshments)</li>
                </ul>
                
                <p>Book your tickets now through our <a href="{% url 'booking' %}">booking page</a>. Limited seats available!</p>
                
                <p>This concert supports local charities and spreads joy during the holiday season. We look forward to seeing you there!</p>
                ''',
                'excerpt': 'Book tickets for Diamond Band\'s Christmas concert on December 20, 2025.',
                'featured_image_url': 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
                'is_featured': True,
                'status': 'published',
            },
            {
                'title': 'Diamond Band Featured in Local Music Magazine',
                'slug': 'diamond-band-magazine-feature',
                'content': '''
                <p>Diamond Band has been featured in the latest issue of "Harmony Magazine," highlighting our unique blend of jazz and Christian music. The article explores our musical journey and commitment to positive messaging.</p>
                
                <p>The feature includes interviews with band members and insights into our creative process. We're honored to be recognized for our contributions to the local music scene.</p>
                
                <p>Pick up a copy of Harmony Magazine at local bookstores or read the digital edition online.</p>
                ''',
                'excerpt': 'Diamond Band featured in Harmony Magazine for our jazz and Christian music fusion.',
                'featured_image_url': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
                'is_featured': False,
                'status': 'published',
            },
            {
                'title': 'First Love Music Collaborates with Local Artists',
                'slug': 'first-love-music-collaboration',
                'content': '''
                <p>First Love Music is excited to announce a collaboration with local gospel choir "Heaven's Voices" for an upcoming joint performance. This partnership brings together different musical styles to create a powerful worship experience.</p>
                
                <p>The collaboration will debut at our spring concert series. Stay tuned for more details and ticket information.</p>
                
                <p>Stream our current releases while you wait!</p>
                ''',
                'excerpt': 'First Love Music collaborates with local gospel choir for upcoming performances.',
                'featured_image_url': 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
                'is_featured': False,
                'status': 'published',
            },
            {
                'title': 'Diamond Band Summer Tour Dates Announced',
                'slug': 'diamond-band-summer-tour',
                'content': '''
                <p>Diamond Band is hitting the road this summer! We've announced dates for our "Faith & Rhythm" tour, bringing our uplifting music to cities across the region.</p>
                
                <p>Tour Dates:</p>
                <ul>
                    <li>June 15: City Park Amphitheater</li>
                    <li>June 22: Downtown Music Hall</li>
                    <li>July 5: Riverside Festival Grounds</li>
                    <li>July 12: Community Church</li>
                </ul>
                
                <p>Tickets available through our <a href="{% url 'booking' %}">booking system</a>. Early bird pricing ends May 31!</p>
                ''',
                'excerpt': 'Diamond Band announces summer tour dates with booking available now.',
                'featured_image_url': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
                'is_featured': False,
                'status': 'published',
            },
        ]

        for post_data in posts_data:
            # Download image
            try:
                with urllib.request.urlopen(post_data['featured_image_url']) as response:
                    image_data = response.read()
                    image_name = f"{post_data['slug']}.jpg"
                    image_path = os.path.join('blog', image_name)
                    
                    post, created = BlogPost.objects.get_or_create(
                        slug=post_data['slug'],
                        defaults={
                            'title': post_data['title'],
                            'content': post_data['content'],
                            'excerpt': post_data['excerpt'],
                            'status': post_data['status'],
                            'is_featured': post_data['is_featured'],
                            'published_date': timezone.now(),
                        }
                    )
                    
                    if created:
                        post.featured_image.save(image_path, ContentFile(image_data))
                        post.save()
                        self.stdout.write(f"Created blog post: {post.title}")
                    else:
                        self.stdout.write(f"Blog post already exists: {post.title}")
                        
            except Exception as e:
                self.stdout.write(f"Error creating post {post_data['title']}: {e}")

        self.stdout.write("Sample blog posts added successfully!")